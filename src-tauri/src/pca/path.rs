/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

use glob::{glob_with, MatchOptions};
use log::{debug, trace};
use std::path::Path;

#[tauri::command]
pub fn path_exists(path: &str, from: Option<&str>) -> bool {
    debug!("{} {}", super::brand!(from, "path_exists"), path);

    Path::new(path).exists()
}

#[tauri::command]
pub fn paths_exists(paths: Vec<&str>, from: Option<&str>) -> bool {
    debug!("{} {:?}", super::brand!(from, "paths_exists"), paths);

    paths.iter().map(|path| Path::new(path).exists()).all(|x| x)
}

#[tauri::command]
pub fn get_scripts_in_paths(
    patterns: Vec<&str>,
    options: Option<super::glob::GlobMatchOptions>,
    from: Option<&str>,
) -> Vec<String> {
    debug!(
        "{} {:?}",
        super::brand!(from, "get_scripts_in_path"),
        patterns
    );

    let glob_res = patterns
        .iter()
        .flat_map(|pattern| {
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
            .collect::<Vec<_>>()
        })
        .filter(|path| {
            trace!("retrieved -> {:?}", path);

            !path.is_empty()
        })
        .collect::<Vec<_>>();

    debug!(
        "{} {:?}",
        super::brand!(from, "get_scripts_in_path"),
        glob_res
    );

    glob_res
}
