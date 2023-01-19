/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

use super::insert_brand;
use glob::{glob_with, MatchOptions};
use std::path::Path;

#[tauri::command]
pub fn path_exists(path: &str, from: Option<&str>) -> bool {
    println!("[{}] path_exists: {}", insert_brand(from), path);

    Path::new(path).exists()
}

#[tauri::command]
pub fn paths_exists(paths: Vec<&str>, from: Option<&str>) -> bool {
    println!("[{}] path_exists: {:?}", insert_brand(from), paths);

    paths.iter().map(|path| Path::new(path).exists()).all(|x| x)
}

#[tauri::command]
pub fn get_scripts_in_path(
    patterns: Vec<&str>,
    options: Option<super::glob::GlobMatchOptions>,
    from: Option<&str>,
) -> Vec<String> {
    println!(
        "[{}] get_scripts_in_path: {:?}",
        insert_brand(from),
        patterns
    );

    let glob_res: Vec<String> = patterns
        .iter()
        .map(|pattern| {
            glob_with(
                pattern,
                MatchOptions::from(match options {
                    Some(options) => options,
                    None => Default::default(),
                }),
            )
            .expect("Failed to read glob pattern")
            .into_iter()
            .map(|entry| {
                entry
                    .expect("Failed to read glob entry")
                    .to_str()
                    .expect("Failed to convert glob entry to string")
                    .to_string()
            })
            .collect()
        })
        .collect();

    println!("glob_res: {:?}", glob_res);

    glob_res
}
