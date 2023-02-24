/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use log::{info, trace};
use pca::{data::ConfPath, logs::Logs};
use tauri::{api::shell, Manager};

mod pca;

fn main() {
    tauri::Builder::default()
        .menu(pca::menu::create_menu())
        .setup(|app| {
            let path_resolver = app.path_resolver();
            let shell_scope = app.shell_scope();
            let window = app.get_window("main").unwrap();
            let _logs = Logs::new(&path_resolver);

            info!("Starting PCA");

            #[cfg(debug_assertions)] // only include this code on debug builds
            window.open_devtools();

            app.get_window("main").unwrap().on_menu_event(move |event| {
                match event.menu_item_id() {
                    "open_conf" => {
                        trace!("open conf file with default program");
                        shell::open(
                            &shell_scope,
                            path_resolver.app_conf().to_str().unwrap(),
                            None,
                        )
                        .expect("Failed to open settings");
                        trace!("settings opened");
                    }
                    "reset_conf" => {
                        trace!("reset conf file");
                        pca::conf::reset(&path_resolver).expect("Failed to reset settings");
                        trace!("conf reset");
                        window
                            .emit("reset_conf", "")
                            .expect("Failed to emit reset_conf event");
                    }
                    "open_logs" => {
                        trace!("open logs file with default program");
                        shell::open(
                            &shell_scope,
                            path_resolver.app_logs().to_str().unwrap(),
                            None,
                        )
                        .expect("Failed to open logs");
                        trace!("logs opened");
                    }
                    "open_previous_logs" => {
                        trace!("open previous logs file with default program");
                        shell::open(
                            &shell_scope,
                            path_resolver.app_previous_logs().to_str().unwrap(),
                            None,
                        )
                        .expect("Failed to open previous logs");
                        trace!("previous logs opened");
                    }
                    _ => {}
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            pca::path::path_exists,
            pca::path::paths_exists,
            pca::path::get_scripts_in_paths,
            pca::compile::compile_script,
            pca::environment::current_environment,
        ])
        .run(tauri::generate_context!())
        .expect("error while running PCA application");
}
