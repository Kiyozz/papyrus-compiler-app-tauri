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

macro_rules! brand {
    ($from:expr, $text:expr) => {
        format!("[PCA::{}] {}:", $from.unwrap_or("unknown"), $text)
    };
    ($text:expr) => {
        format!("[PCA] {}:", $text)
    };
}

pub(crate) use brand;
