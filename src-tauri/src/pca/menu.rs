/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};
#[cfg(target_os = "macos")]
use tauri::AboutMetadata;

/// Taken from tauri::Menu::os_default.
///
/// Create the default app menu and add Custom Items to the menu.
pub fn create_menu() -> Menu {
    let mut menu = Menu::new();

    let open_conf = CustomMenuItem::new("open_conf", "Open");
    let reset_conf = CustomMenuItem::new("reset_conf", "Reset");
    let settings = Submenu::new(
        "Settings...",
        Menu::new().add_item(open_conf).add_item(reset_conf),
    );
    let report_bug = CustomMenuItem::new("report_bug", "Report a Bug...");
    let open_github = CustomMenuItem::new("open_github", "GitHub...");
    let open_nexus_mods = CustomMenuItem::new("open_nexus_mods", "NexusMods...");
    let check_for_updates = CustomMenuItem::new("check_for_updates", "Check for Updates...");

    #[cfg(target_os = "macos")]
    {
        menu = menu.add_submenu(Submenu::new(
            "PCA",
            Menu::new()
                .add_native_item(MenuItem::About("PCA".to_string(), AboutMetadata::default()))
                .add_item(check_for_updates)
                .add_native_item(MenuItem::Separator)
                .add_submenu(settings)
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Services)
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Hide)
                .add_native_item(MenuItem::HideOthers)
                .add_native_item(MenuItem::ShowAll)
                .add_native_item(MenuItem::Separator)
                .add_native_item(MenuItem::Quit),
        ));
    }

    let mut file_menu = Menu::new();
    #[cfg(not(target_os = "macos"))]
    {
        file_menu = file_menu
            .add_item(check_for_updates)
            .add_native_item(MenuItem::Separator)
            .add_submenu(settings)
            .add_native_item(MenuItem::Separator)
            .add_item(CustomMenuItem::new("open_logs", "Logs"))
            .add_submenu(Submenu::new(
                "Previous sessions...",
                Menu::new().add_item(CustomMenuItem::new("open_previous_logs", "Logs")),
            ))
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Quit);
    }
    menu = menu.add_submenu(Submenu::new("File", file_menu));

    #[cfg(not(target_os = "linux"))]
    let mut edit_menu = Menu::new();
    #[cfg(target_os = "macos")]
    {
        edit_menu = edit_menu.add_native_item(MenuItem::Undo);
        edit_menu = edit_menu.add_native_item(MenuItem::Redo);
        edit_menu = edit_menu.add_native_item(MenuItem::Separator);
    }
    #[cfg(not(target_os = "linux"))]
    {
        edit_menu = edit_menu.add_native_item(MenuItem::Cut);
        edit_menu = edit_menu.add_native_item(MenuItem::Copy);
        edit_menu = edit_menu.add_native_item(MenuItem::Paste);
    }
    #[cfg(target_os = "macos")]
    {
        edit_menu = edit_menu.add_native_item(MenuItem::SelectAll);
    }
    #[cfg(not(target_os = "linux"))]
    {
        menu = menu.add_submenu(Submenu::new("Edit", edit_menu));
    }
    #[cfg(target_os = "macos")]
    {
        menu = menu.add_submenu(Submenu::new(
            "View",
            Menu::new().add_native_item(MenuItem::EnterFullScreen),
        ));
    }

    let mut window_menu = Menu::new();
    window_menu = window_menu.add_native_item(MenuItem::Minimize);
    #[cfg(target_os = "macos")]
    {
        window_menu = window_menu.add_native_item(MenuItem::Zoom);
        window_menu = window_menu.add_native_item(MenuItem::Separator);
    }
    window_menu = window_menu.add_native_item(MenuItem::CloseWindow);
    menu = menu.add_submenu(Submenu::new("Window", window_menu));

    let mut help_menu = Menu::new();

    help_menu = help_menu
        .add_item(report_bug)
        .add_native_item(MenuItem::Separator)
        .add_item(open_github)
        .add_item(open_nexus_mods);

    menu = menu.add_submenu(Submenu::new("Help", help_menu));

    menu
}
