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
use glob::{glob_with, MatchOptions};
use serde::Deserialize;

#[derive(Deserialize, Default, Copy, Clone)]
struct MatchOptionsWrapper {
    case_sensitive: bool,
    require_literal_separator: bool,
    require_literal_leading_dot: bool,
}

impl From<MatchOptionsWrapper> for MatchOptions {
    fn from(wrapper: MatchOptionsWrapper) -> Self {
        MatchOptions {
            case_sensitive: wrapper.case_sensitive,
            require_literal_separator: wrapper.require_literal_separator,
            require_literal_leading_dot: wrapper.require_literal_leading_dot,
        }
    }
}

fn insert_brand(text: Option<&str>) -> String {
    format!("PCA::{}", text.unwrap_or("unknown"))
}

#[tauri::command]
fn get_scripts_in_path(patterns: Vec<&str>, options: Option<MatchOptionsWrapper>, from: Option<&str>) -> Vec<String> {
    println!("[{}] get_scripts_in_path: {:?}", insert_brand(from), patterns);

    let glob_res = patterns.iter().map(move |pattern| {
        glob_with(pattern, MatchOptions::from(match options {
            Some(options) => options,
            None => Default::default(),
        }))
    });
        // .map(|path| path.to_str().unwrap().to_string())
        // .collect();

    println!("glob_res: {:?}", glob_res);

    vec![]
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

#[tauri::command]
fn paths_exists(paths: Vec<&str>, from: Option<&str>) -> bool {
    println!("[{}] path_exists: {:?}", insert_brand(from), paths);

    paths.iter().map(|path| Path::new(path).exists()).all(|x| x)
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            app.get_window("main").unwrap().open_devtools();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![path_exists, compile_script, get_scripts_in_path, paths_exists])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
