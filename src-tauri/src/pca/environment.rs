/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

use log::debug;

/// Get the current application environment, if the build is a release or a debug.
///
/// Used by Webview.
#[tauri::command]
pub fn current_environment(from: Option<&str>) -> &str {
    let env = if cfg!(debug_assertions) {
        "debug"
    } else {
        "release"
    };

    debug!("{} {}", super::brand!(from, "current_environment"), env);

    env
}
