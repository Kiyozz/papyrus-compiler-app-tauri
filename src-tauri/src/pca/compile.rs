/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

use log::{debug, error, info};
use regex::Regex;
use std::process::{Command, Stdio};
#[cfg(debug_assertions)]
use std::thread::sleep;
#[cfg(debug_assertions)]
use std::time::Duration;

macro_rules! compile_brand {
    ($from:expr) => {
        super::brand!($from, "compile_script")
    };
}

/// Construct the command line to compile a psc script.
///
/// Get the PapyrusCompiler path with args and script name and produce a .pex file.
#[tauri::command]
pub async fn compile_script(
    compiler_path: &str,
    args: Vec<&str>,
    script_name: &str,
    from: Option<&str>,
) -> Result<String, String> {
    info!("{} {}", compile_brand!(from), script_name);
    #[cfg(debug_assertions)] // only include this code on debug builds
    sleep(Duration::from_secs(match script_name {
        s if s.contains("Data.psc") => 2,
        _ => 0.25 as u64,
    }));

    let output = Command::new(compiler_path)
        .args(&args)
        .stdout(Stdio::piped())
        .output()
        .map_err(|err| {
            let message = format!("{} {}", compile_brand!(from), err);

            error!(
                "{} — Compiler:`{}` — Args:`{:?}`",
                message, compiler_path, &args
            );

            message
        })?;

    let output_err = String::from_utf8(output.stderr).expect("cannot convert stderr as string");
    let output = String::from_utf8(output.stdout).expect("cannot convert stdout as string");

    let output = get_final_output(&output_err, &output, script_name).map_err(|err| {
        let message = format!("{} {}", compile_brand!(from), err);

        error!("{}", message);

        message
    })?;

    debug!(
        "———\n{} [FINISHED] \n\t->{}\n{}\n———",
        compile_brand!(from),
        script_name,
        output
    );

    Ok(output)
}

fn get_final_output(
    output_err: &str,
    output: &str,
    script_name: &str,
) -> Result<String, regex::Error> {
    match output_err.len() {
        0 => clean_output(output, script_name),
        _ => Ok(output_err.to_string()),
    }
}

/// Remove useless strings from the PapyrusCompiler command's output.
fn clean_output(output: &str, script_name: &str) -> Result<String, regex::Error> {
    let papyrus_compiler_version_regex =
        Regex::new(r"Papyrus Compiler Version .* for (Fallout 4|Skyrim)")?;
    let copyright_regex = Regex::new(r"Copyright .*. All rights reserved\.?")?;
    let batch_compile_regex =
        Regex::new(r"Batch compile of \d+ files finished\. \d+ succeeded, \d+ failed\.")?;
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

    Ok(result.trim().to_string())
}
