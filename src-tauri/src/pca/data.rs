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
    /// Get the application conf.json file.
    ///
    /// This file is the application conf.
    fn app_conf(&self) -> PathBuf {
        let mut path = self.app_config_dir().unwrap();
        path.push("conf.json");

        path
    }

    /// Get the application pca.log file.
    ///
    /// This is file is the logs produced by the application.
    fn app_logs(&self) -> PathBuf {
        let mut path = self.app_local_data_dir().unwrap();
        path.push("pca.log");

        path
    }

    /// Get the application pca_previous.log file.
    ///
    /// This is file is the logs produced by the application in the previous application launch.
    fn app_previous_logs(&self) -> PathBuf {
        let mut path = self.app_local_data_dir().unwrap();
        path.push("pca_previous.log");

        path
    }
}
