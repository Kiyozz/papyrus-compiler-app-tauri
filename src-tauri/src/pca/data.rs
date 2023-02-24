/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

use std::path::PathBuf;
use tauri::PathResolver;

pub trait ConfPath {
    fn app_conf(&self) -> PathBuf;
    fn app_logs(&self) -> PathBuf;
    fn app_previous_logs(&self) -> PathBuf;
}

impl ConfPath for PathResolver {
    fn app_conf(&self) -> PathBuf {
        let mut path = self.app_config_dir().unwrap();
        path.push("settings.json");

        path
    }

    fn app_logs(&self) -> PathBuf {
        let mut path = self.app_local_data_dir().unwrap();
        path.push("pca.log");

        path
    }

    fn app_previous_logs(&self) -> PathBuf {
        let mut path = self.app_local_data_dir().unwrap();
        path.push("pca_previous.log");

        path
    }
}
