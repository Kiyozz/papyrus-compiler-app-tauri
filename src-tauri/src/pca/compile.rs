/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

use super::insert_brand;
use std::process::{Command, Stdio};
use std::thread::sleep;
use std::time::Duration;

#[tauri::command]
pub async fn compile_script(
    compiler_path: &str,
    args: Vec<&str>,
    script_name: &str,
    from: Option<&str>,
) -> Result<String, String> {
    println!("[{}] compile_script: {}", insert_brand(from), script_name);
    #[cfg(debug_assertions)] // only include this code on debug builds
    sleep(Duration::from_secs(match script_name {
        s if s.contains("Data.psc") => 2,
        _ => 1,
    }));

    let output = Command::new(compiler_path)
        .args(args)
        .stdout(Stdio::piped())
        .output()
        .unwrap_or_else(|_| panic!("{}", insert_brand(Some("failed to execute child"))));
    let output_err = String::from_utf8(output.stderr).expect("cannot convert stderr as string");
    let output = String::from_utf8(output.stdout).expect("cannot convert stdout as string");

    println!("output: {}", output_err);

    let output = get_final_output(&output_err, &output);

    println!(
        "———\n[{}] compile_script: [FINISHED] \n\t->{}\n{}———",
        insert_brand(from),
        script_name,
        output
    );

    Ok(output)
}

fn get_final_output(output_err: &str, output: &str) -> String {
    match output_err.len() {
        0 => output.to_string(),
        _ => output_err.to_string(),
    }
}
