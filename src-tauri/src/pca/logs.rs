/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

use crate::pca::conf::Conf;
use crate::pca::data::ConfPath;
use log::{debug, error, info, trace, warn};
use log4rs::append::{console::ConsoleAppender, file::FileAppender};
use log4rs::config::{Appender, Logger, Root};
use log4rs::encode::pattern::PatternEncoder;
use log4rs::Config as LogConfig;
use serde_json::Value;
use std::fs;
use std::path::PathBuf;
use tauri::PathResolver;

#[derive(Debug)]
pub struct Logs {
    pub file_path: PathBuf,
    pub previous_file_path: PathBuf,
    pub handle: log4rs::Handle,
}

pub struct LogsState {
    pub logs: Result<Logs, crate::pca::Error>,
}

/// Create a LogConf depending of the application conf.
fn build_config(conf: Result<Conf, crate::pca::Error>, path: &PathBuf) -> LogConfig {
    let level = match conf {
        Ok(conf) => conf.log_level_filter(),
        Err(_) => log::LevelFilter::Debug,
    };
    let stdout = ConsoleAppender::builder().build();
    let requests = FileAppender::builder()
        .encoder(Box::new(PatternEncoder::new("{d} - {m}{n}")))
        .build(path)
        .unwrap();

    LogConfig::builder()
        .appender(Appender::builder().build("stdout", Box::new(stdout)))
        .appender(Appender::builder().build("requests", Box::new(requests)))
        .logger(Logger::builder().build("pca", level))
        .build(
            Root::builder()
                .appender("stdout")
                .appender("requests")
                .build(level),
        )
        .unwrap()
}

impl Logs {
    pub fn new(resolver: &PathResolver) -> Result<Self, crate::pca::Error> {
        let app_logs = resolver.app_logs();
        let previous_app_logs = resolver.app_previous_logs();

        if app_logs.exists() {
            match fs::copy(&app_logs, &previous_app_logs) {
                Ok(_) => {
                    fs::remove_file(&app_logs).expect("Failed to remove log file");
                }
                Err(err) => {
                    warn!("Failed to copy log file as previous log file: {}", err);
                }
            }
        }

        let conf = Conf::get(resolver);

        let handle =
            log4rs::init_config(build_config(conf, &app_logs)).map_err(crate::pca::Error::from)?;

        Ok(Self {
            file_path: app_logs,
            previous_file_path: previous_app_logs,
            handle,
        })
    }

    pub fn set_config(&self, resolver: &PathResolver) -> Result<(), crate::pca::Error> {
        let app_logs = resolver.app_logs();
        let previous_app_logs = resolver.app_previous_logs();

        if app_logs.exists() {
            match fs::copy(&app_logs, previous_app_logs) {
                Ok(_) => {
                    fs::remove_file(&app_logs).expect("Failed to remove log file");
                }
                Err(err) => {
                    warn!("Failed to copy log file as previous log file: {}", err);
                }
            }
        }

        let conf = Conf::get(resolver);

        self.handle.set_config(build_config(conf, &app_logs));

        Ok(())
    }

    pub fn on_conf_reset(&self, resolver: &PathResolver) -> Result<(), crate::pca::Error> {
        self.set_config(resolver)
    }
}

/// Create a log entry in the application pca.log file.
///
/// Used by Webview.
#[tauri::command]
pub fn log(ns: String, message: String, level: String, args: &str) {
    let args = serde_json::from_str::<Value>(args).unwrap();

    match level.as_str() {
        "trace" => trace!(target: "pca", "{} — {} {:#?}", ns, message, args),
        "debug" => debug!(target: "pca", "{} — {} {:?}", ns, message, args),
        "info" => info!(target: "pca", "{} — {} {}", ns, message, args),
        "warn" => warn!(target: "pca", "{} — {} {}", ns, message, args),
        "error" => error!(target: "pca", "{} — {} {}", ns, message, args),
        _ => trace!(target: "pca", "{} — {} {}", ns, message, args),
    }
}
