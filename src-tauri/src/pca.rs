/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

pub mod compile;
pub mod glob;
pub mod path;

pub fn insert_brand(text: Option<&str>) -> String {
    format!("PCA::{}", text.unwrap_or("unknown"))
}
