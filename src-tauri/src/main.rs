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

use tauri::Manager;
use std::path::Path;
use std::process::{Command, Stdio};
use std::thread::sleep;

fn insert_brand(text: Option<&str>) -> String {
    format!("PCA::{}", text.unwrap_or_else(|| "unknown"))
}

#[tauri::command]
async fn compile_script<'a>(compiler_path: &str, args: Vec<&str>, script_name: &str, from: Option<&str>) -> Result<String, String> {
    println!("[{}] compile_script: {}", insert_brand(from), script_name);
    #[cfg(debug_assertions)] // only include this code on debug builds
    sleep(std::time::Duration::from_secs(if script_name.contains("Data.psc") { 2 } else { 1 }));

    let child = Command::new(compiler_path)
        .args(args)
        .stdout(Stdio::piped())
        .spawn()
        .expect(insert_brand(Some("failed to execute child")).as_str());
    let output = child
        .wait_with_output()
        .expect(insert_brand(Some("failed to wait on child")).as_str());
    let output = String::from_utf8(output.stdout).unwrap().replace("<unknown>", "unknown");
    println!("———\n[{}] compile_script: [FINISHED] \n\t->{}\n{}———", insert_brand(from), script_name, output);

    Ok(output)
}

#[tauri::command]
fn path_exists(path: &str, from: Option<&str>) -> bool {
    println!("[{}] path_exists: {}", insert_brand(from), path);

    Path::new(path).exists()
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            app.get_window("main").unwrap().open_devtools();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![path_exists, compile_script])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
