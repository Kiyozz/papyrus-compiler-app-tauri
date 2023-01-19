/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

use glob::MatchOptions;
use serde::Deserialize;

#[derive(Deserialize, Default, Copy, Clone)]
pub struct GlobMatchOptions {
    case_sensitive: bool,
    require_literal_separator: bool,
    require_literal_leading_dot: bool,
}

impl From<GlobMatchOptions> for MatchOptions {
    fn from(glob_match: GlobMatchOptions) -> Self {
        MatchOptions {
            case_sensitive: glob_match.case_sensitive,
            require_literal_separator: glob_match.require_literal_separator,
            require_literal_leading_dot: glob_match.require_literal_leading_dot,
        }
    }
}
