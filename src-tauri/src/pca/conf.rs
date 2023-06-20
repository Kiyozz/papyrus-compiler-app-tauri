/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

use crate::pca::{data::ConfPath, logs::LogsState};
use log::{trace, LevelFilter};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;
use tauri::api::file;
use tauri::{Manager, PathResolver, Window, Wry};

/// This is the application conf.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Conf {
    pub game: Game,
    pub compilation: Compilation,
    pub tutorial: Tutorial,
    pub mo2: Mo2,
    pub telemetry: Telemetry,
    pub theme: String,
    pub locale: String,
    pub misc: Misc,
    pub log_level: String,
}

impl Default for Conf {
    /// Create a default Conf. Used by the application menu to reset the application conf.
    fn default() -> Self {
        let compiler_path = Path::new("Papyrus Compiler");
        let compilation_output = Path::new("Data");
        let mo2_output = Path::new("overwrite");

        Conf {
            game: Game {
                type_field: "Skyrim SE/AE".to_string(),
                path: "".to_string(),
            },
            compilation: Compilation {
                compiler_path: compiler_path
                    .join("PapyrusCompiler.exe")
                    .to_str()
                    .unwrap()
                    .to_string(),
                flag: "TESV_Papyrus_Flags.flg".to_string(),
                concurrent_scripts: 15,
                output: compilation_output
                    .join("Scripts")
                    .to_str()
                    .unwrap()
                    .to_string(),
            },
            tutorial: Tutorial {
                settings: false,
                telemetry: true,
            },
            mo2: Mo2 {
                use_field: false,
                instance: None,
                output: mo2_output.join("Scripts").to_str().unwrap().to_string(),
                mods_folder_relative_to_instance: "mods".to_string(),
            },
            telemetry: Telemetry { use_field: false },
            theme: "system".to_string(),
            locale: "fr".to_string(),
            misc: Misc {
                documentation: Documentation { reminder: true },
                drawer_open: false,
            },
            log_level: "error".to_string(),
        }
    }
}

impl Conf {
    pub fn reset(resolver: &PathResolver) -> Result<Conf, crate::pca::Error> {
        let conf = Conf::default();

        conf.save(resolver).map_err(crate::pca::Error::from)?;

        Ok(conf)
    }

    pub fn log_level_filter(&self) -> LevelFilter {
        match self.log_level.as_str() {
            "trace" => LevelFilter::Trace,
            "debug" => LevelFilter::Debug,
            "info" => LevelFilter::Info,
            "warn" => LevelFilter::Warn,
            "error" => LevelFilter::Error,
            _ => LevelFilter::Off,
        }
    }

    pub fn get(resolver: &PathResolver) -> Result<Self, crate::pca::Error> {
        let settings_file =
            file::read_string(resolver.app_conf()).map_err(crate::pca::Error::from)?;
        let json: Result<Conf, _> = serde_json::from_str(settings_file.as_str());

        json.map_err(crate::pca::Error::from)
    }

    pub fn save(&self, resolver: &PathResolver) -> Result<(), crate::pca::Error> {
        let json = serde_json::to_string_pretty(self).expect("Failed to serialize settings");

        fs::write(resolver.app_conf(), json).map_err(crate::pca::Error::from)
    }

    pub fn emit_reset(&self, window: &Window<Wry>) {
        window
            .emit("pca://conf_reset", self)
            .expect("Failed to emit reset_conf event");
    }
}

#[tauri::command]
pub fn on_conf_reset(window: Window<Wry>, logs_state: tauri::State<&LogsState>) {
    trace!("reset conf file");

    match &logs_state.logs {
        Ok(logs) => {
            let path_resolver = &window.app_handle().path_resolver();
            let new_conf = Conf::reset(path_resolver).expect("Failed to reset settings");

            logs.on_conf_reset(path_resolver)
                .expect("Cannot logs.on_conf_reset after Conf::reset from on_conf_reset command");

            trace!("conf reset");

            new_conf.emit_reset(&window);
        }
        Err(err) => {
            trace!("failed to reset conf file: {:#?}", err);
        }
    }
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Game {
    #[serde(rename = "type")]
    pub type_field: String,
    pub path: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Compilation {
    pub compiler_path: String,
    pub flag: String,
    pub concurrent_scripts: i64,
    pub output: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Tutorial {
    pub settings: bool,
    pub telemetry: bool,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Mo2 {
    #[serde(rename = "use")]
    pub use_field: bool,
    pub output: String,
    pub mods_folder_relative_to_instance: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    #[serde(default)]
    pub instance: Option<String>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Telemetry {
    #[serde(rename = "use")]
    pub use_field: bool,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Misc {
    pub drawer_open: bool,
    pub documentation: Documentation,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Documentation {
    pub reminder: bool,
}
