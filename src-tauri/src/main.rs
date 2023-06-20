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

use crate::pca::conf::Conf;
use crate::pca::logs::LogsState;
use log::{info, trace};
use pca::{data::ConfPath, logs::Logs};
use tauri::{api::shell, Manager};

mod pca;

fn main() {
    tauri::Builder::default()
        .plugin(pca::window_state_plugin::Builder::default().build())
        .menu(pca::menu::create_menu())
        .setup(|app| {
            let path_resolver = app.path_resolver();
            let window = app.get_window("main").unwrap();

            let managed = app.manage(LogsState {
                logs: Logs::new(&path_resolver),
            });

            if !managed {
                panic!(
                    "Failed to manage logs. Logs cannot be managed by App<Wry>.manage(State<T>)"
                );
            }

            info!("Starting PCA");

            #[cfg(debug_assertions)] // only include this code on debug builds
            window.open_devtools();

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            pca::path::path_exists,
            pca::path::paths_exists,
            pca::path::get_scripts_in_paths,
            pca::path::is_file,
            pca::compile::compile_script,
            pca::environment::current_environment,
            pca::logs::log,
            pca::conf::on_conf_reset,
        ])
        .on_menu_event(|event| {
            let window = event.window();
            let logs_state = window.state::<LogsState>();
            let shell_scope = window.shell_scope();
            let path_resolver = window.app_handle().path_resolver();

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

                    match &logs_state.logs {
                        Ok(logs) => {
                            let new_conf =
                                Conf::reset(&path_resolver).expect("Failed to reset settings");

                            logs.on_conf_reset(&path_resolver).expect(
                                "Cannot logs.on_conf_reset after Conf::reset from on_menu_event",
                            );

                            trace!("conf reset");
                            new_conf.emit_reset(window);
                        }
                        Err(err) => {
                            println!("Failed to reset settings: {:#?}", err);
                        }
                    }
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
                "report_bug" => {
                    trace!("open bug report page");
                    shell::open(
                        &shell_scope,
                        "https://github.com/Kiyozz/papyrus-compiler-app/issues/new",
                        None,
                    )
                    .expect("Failed to open bug report page");
                    trace!("bug report page opened");
                }
                "open_github" => {
                    trace!("open github page");
                    shell::open(
                        &shell_scope,
                        "https://github.com/Kiyozz/papyrus-compiler-app",
                        None,
                    )
                    .expect("Failed to open github page");
                    trace!("github page opened");
                }
                "open_nexus_mods" => {
                    trace!("open nexus mods page");
                    shell::open(
                        &shell_scope,
                        "https://nexusmods.com/skyrimspecialedition/mods/23852",
                        None,
                    )
                    .expect("Failed to open nexus mods page");
                    trace!("nexus mods page opened");
                }
                "check_for_updates" => {
                    trace!("emit check_for_updates event");
                    window
                        .emit("pca://check_for_updates", None::<Option<String>>)
                        .expect("Failed to emit check_for_updates event");
                    trace!("check_for_updates event emitted");
                }
                _ => {}
            }
        })
        .run(tauri::generate_context!())
        .expect("error while running PCA application");
}
