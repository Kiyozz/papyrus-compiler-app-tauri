/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

use crate::pca::data::ConfPath;
use log::LevelFilter;
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::Path;
use tauri::api::file;
use tauri::PathResolver;

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
    fn default() -> Self {
        let compiler_path = Path::new("Papyrus Compiler");
        let compilation_output = Path::new("Data");
        let mo2_output = Path::new("overwrite");

        Conf {
            game: Game {
                type_field: "Skyrim SE".to_string(),
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
}

impl From<&PathResolver> for Conf {
    fn from(resolver: &PathResolver) -> Self {
        let settings_file = file::read_string(resolver.app_conf())
            .expect("Failed to read settings file. Try resetting the settings.");
        let json: Conf = serde_json::from_str(settings_file.as_str())
            .expect("Failed to parse settings file. Try resetting the settings.");

        json
    }
}

pub fn reset(resolver: &PathResolver) -> Result<(), std::io::Error> {
    let conf = Conf::default();
    let json = serde_json::to_string_pretty(&conf).expect("Failed to serialize settings");
    fs::write(resolver.app_conf(), json)
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
