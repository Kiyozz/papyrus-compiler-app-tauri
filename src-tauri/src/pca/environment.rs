/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

use log::debug;

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
