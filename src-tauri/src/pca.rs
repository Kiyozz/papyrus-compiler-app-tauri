/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

pub mod compile;
pub mod conf;
pub mod data;
pub mod environment;
pub mod glob;
pub mod logs;
pub mod menu;
pub mod path;
pub mod window_state_plugin;

macro_rules! brand {
    ($from:expr, $text:expr) => {
        format!("[PCA::{}] {}:", $from.unwrap_or("unknown"), $text)
    };
    ($text:expr) => {
        format!("[PCA] {}:", $text)
    };
}

pub(crate) use brand;

#[derive(Debug)]
pub enum Error {
    Io(std::io::Error),
    Tauri(tauri::Error),
    TauriApi(tauri::api::Error),
    Json(serde_json::Error),
    Logs(log::SetLoggerError),
}

impl From<tauri::Error> for Error {
    fn from(err: tauri::Error) -> Self {
        Error::Tauri(err)
    }
}

impl From<tauri::api::Error> for Error {
    fn from(err: tauri::api::Error) -> Self {
        Error::TauriApi(err)
    }
}

impl From<std::io::Error> for Error {
    fn from(err: std::io::Error) -> Self {
        Error::Io(err)
    }
}

impl From<serde_json::Error> for Error {
    fn from(err: serde_json::Error) -> Self {
        Error::Json(err)
    }
}

impl From<log::SetLoggerError> for Error {
    fn from(err: log::SetLoggerError) -> Self {
        Error::Logs(err)
    }
}
