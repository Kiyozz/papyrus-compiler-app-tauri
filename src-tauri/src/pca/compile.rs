/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

use regex::Regex;
use std::process::{Command, Stdio};
use std::thread::sleep;
use std::time::Duration;

macro_rules! compile_brand {
    ($from:expr) => {
        super::brand!($from, "compile_script")
    };
    ($from:expr, $text:expr) => {
        super::brand!($from, "compile_script")
    };
    () => {
        brand!("compile_script")
    };
}

#[tauri::command]
pub async fn compile_script(
    compiler_path: &str,
    args: Vec<&str>,
    script_name: &str,
    from: Option<&str>,
) -> Result<String, String> {
    println!("{} {}", compile_brand!(from), script_name);
    #[cfg(debug_assertions)] // only include this code on debug builds
    sleep(Duration::from_secs(match script_name {
        s if s.contains("Data.psc") => 2,
        _ => 0.25 as u64,
    }));

    let output = Command::new(compiler_path)
        .args(args)
        .stdout(Stdio::piped())
        .output()
        .unwrap_or_else(|_| panic!("{} {}", compile_brand!(from), "failed to execute child"));
    let output_err = String::from_utf8(output.stderr).expect("cannot convert stderr as string");
    let output = String::from_utf8(output.stdout).expect("cannot convert stdout as string");

    println!("{} [output_err]: {}", compile_brand!(from), output_err);

    let output = get_final_output(&output_err, &output, script_name);

    println!(
        "———\n{} [FINISHED] \n\t->{}\n{}\n———",
        compile_brand!(from),
        script_name,
        output
    );

    Ok(output)
}

fn get_final_output(output_err: &str, output: &str, script_name: &str) -> String {
    match output_err.len() {
        0 => clean_output(output, script_name),
        _ => output_err.to_string(),
    }
}

fn clean_output(output: &str, script_name: &str) -> String {
    let papyrus_compiler_version_regex =
        Regex::new(r"Papyrus Compiler Version .* for (Fallout 4|Skyrim)").unwrap();
    let copyright_regex = Regex::new(r"Copyright .*. All rights reserved\.?").unwrap();
    let batch_compile_regex =
        Regex::new(r"Batch compile of \d+ files finished\. \d+ succeeded, \d+ failed\.").unwrap();
    let script_name_no_psc = script_name.replace(".psc", "");

    let result = output
        .replace("Starting 1 compile threads for 1 files...", "")
        .replace(
            format!("Compiling \"{}\"...", script_name_no_psc).as_str(),
            "",
        )
        .replace(format!("Compiling \"{}\"...", script_name).as_str(), "")
        .replace("Assembly succeeded.", "")
        .replace("Compilation succeeded.", "")
        .replace("0 error(s), 0 warning(s)", "");

    let result = batch_compile_regex
        .replace_all(result.as_str(), "Succeeded")
        .to_string();

    let result = papyrus_compiler_version_regex
        .replace_all(result.as_str(), "")
        .to_string();

    let result = copyright_regex.replace_all(result.as_str(), "").to_string();

    result.trim().to_string()
}
