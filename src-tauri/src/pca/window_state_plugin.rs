/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

use serde::{Deserialize, Serialize};
use tauri::{
    plugin::{Builder as PluginBuilder, TauriPlugin},
    LogicalSize, Manager, Monitor, PhysicalPosition, PhysicalSize, RunEvent, Runtime, Window,
    WindowEvent,
};

use std::{
    collections::HashMap,
    fs::{create_dir_all, File},
    io::Write,
    sync::{Arc, Mutex},
};

pub const STATE_FILENAME: &str = "window-state";

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error(transparent)]
    Tauri(#[from] tauri::Error),
    #[error(transparent)]
    TauriApi(#[from] tauri::api::Error),
    #[error(transparent)]
    Bincode(#[from] Box<bincode::ErrorKind>),
}

pub type Result<T> = std::result::Result<T, Error>;

#[derive(Debug, Default, Deserialize, Serialize)]
struct WindowState {
    width: f64,
    height: f64,
    x: i32,
    y: i32,
}

struct WindowStateCache(Arc<Mutex<HashMap<String, WindowState>>>);
pub trait AppHandleExt {
    fn save_window_state(&self) -> Result<()>;
}

impl<R: Runtime> AppHandleExt for tauri::AppHandle<R> {
    fn save_window_state(&self) -> Result<()> {
        if let Some(app_dir) = self.path_resolver().app_config_dir() {
            let state_path = app_dir.join(STATE_FILENAME);
            let cache = self.state::<WindowStateCache>();
            let mut state = cache.0.lock().unwrap();
            for (label, s) in state.iter_mut() {
                if let Some(window) = self.get_window(label) {
                    window.update_state(s)?;
                }
            }

            create_dir_all(&app_dir)
                .map_err(Error::Io)
                .and_then(|_| File::create(state_path).map_err(Into::into))
                .and_then(|mut f| {
                    f.write_all(&bincode::serialize(&*state).map_err(Error::Bincode)?)
                        .map_err(Into::into)
                })
        } else {
            Ok(())
        }
    }
}

pub trait WindowExt {
    fn restore_state(&self) -> tauri::Result<()>;
}

impl<R: Runtime> WindowExt for Window<R> {
    fn restore_state(&self) -> tauri::Result<()> {
        let cache = self.state::<WindowStateCache>();
        let mut c = cache.0.lock().unwrap();

        if let Some(state) = c.get(self.label()) {
            self.set_size(LogicalSize {
                width: state.width,
                height: state.height,
            })?;

            // restore position to saved value if saved monitor exists
            // otherwise, let the OS decide where to place the window
            for m in self.available_monitors()? {
                if m.contains((state.x, state.y).into()) {
                    self.set_position(PhysicalPosition {
                        x: state.x,
                        y: state.y,
                    })?;
                }
            }
        } else {
            let mut metadata = WindowState::default();

            let scale_factor = self
                .current_monitor()?
                .map(|m| m.scale_factor())
                .unwrap_or(1.);
            let size = self.inner_size()?.to_logical(scale_factor);
            metadata.width = size.width;
            metadata.height = size.height;

            let pos = self.outer_position()?;
            metadata.x = pos.x;
            metadata.y = pos.y;

            c.insert(self.label().into(), metadata);
        }

        Ok(())
    }
}

trait WindowExtInternal {
    fn update_state(&self, state: &mut WindowState) -> tauri::Result<()>;
}

impl<R: Runtime> WindowExtInternal for Window<R> {
    fn update_state(&self, state: &mut WindowState) -> tauri::Result<()> {
        let is_maximized = self.is_maximized()?;

        let scale_factor = self
            .current_monitor()?
            .map(|m| m.scale_factor())
            .unwrap_or(1.);
        let size = self.outer_size()?.to_logical(scale_factor);

        // It doesn't make sense to save a self with 0 height or width
        if size.width > 0. && size.height > 0. && !is_maximized {
            state.width = size.width;
            state.height = size.height;
        }

        let position = self.outer_position()?;
        if let Ok(Some(monitor)) = self.current_monitor() {
            // save only window positions that are inside the current monitor
            if monitor.contains(position) && !is_maximized {
                state.x = position.x;
                state.y = position.y;
            }
        }

        Ok(())
    }
}

#[derive(Default)]
pub struct Builder {}

impl Builder {
    pub fn build<R: Runtime>(self) -> TauriPlugin<R> {
        PluginBuilder::new("window-state")
            .setup(|app| {
                let cache: Arc<Mutex<HashMap<String, WindowState>>> = if let Some(app_dir) =
                    app.path_resolver().app_config_dir()
                {
                    let state_path = app_dir.join(STATE_FILENAME);
                    if state_path.exists() {
                        Arc::new(Mutex::new(
                            tauri::api::file::read_binary(state_path)
                                .map_err(Error::TauriApi)
                                .and_then(|state| bincode::deserialize(&state).map_err(Into::into))
                                .unwrap_or_default(),
                        ))
                    } else {
                        Default::default()
                    }
                } else {
                    Default::default()
                };
                app.manage(WindowStateCache(cache));
                Ok(())
            })
            .on_webview_ready(move |window| {
                let _ = window.restore_state();

                let cache = window.state::<WindowStateCache>();
                let cache = cache.0.clone();
                let label = window.label().to_string();
                let window_clone = window.clone();
                window.on_window_event(move |e| {
                    if let WindowEvent::CloseRequested { .. } = e {
                        let mut c = cache.lock().unwrap();
                        if let Some(state) = c.get_mut(&label) {
                            let _ = window_clone.update_state(state);
                        }
                    }
                });
            })
            .on_event(move |app, event| {
                if let RunEvent::Exit = event {
                    let _ = app.save_window_state();
                }
            })
            .build()
    }
}

trait MonitorExt {
    fn contains(&self, position: PhysicalPosition<i32>) -> bool;
}

impl MonitorExt for Monitor {
    fn contains(&self, position: PhysicalPosition<i32>) -> bool {
        let PhysicalPosition { x, y } = *self.position();
        let PhysicalSize { width, height } = *self.size();

        x < position.x as _
            && position.x < (x + width as i32)
            && y < position.y as _
            && position.y < (y + height as i32)
    }
}
