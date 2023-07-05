/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type TranslationSchema } from 'App/Type/TranslationSchema'

const en: TranslationSchema = {
  common: {
    loadingConf: 'Loading configuration...',
    back: 'Back',
    next: 'Next',
    skip: 'Skip',
    close: 'Close',
    cancel: 'Cancel',
    clearList: 'Clear list',
    confirm: 'Confirm',
    create: 'Create',
    start: 'Start',
    remove: 'Remove',
    searchScripts: 'Search',
    moreDetails: 'More details',
    lessDetails: 'Less details',
    edit: 'Edit',
    noScripts: 'No scripts',
    recentFiles: 'Recent files',
    group: 'Group',
    activate: 'Activate',
    failed: 'Failed',
    succeeded: 'Succeeded',
    actions: 'Actions',
    select: {
      file: 'Select file',
      folder: 'Select folder',
      all: 'Select all',
      none: 'Select none',
      invert: 'Invert selection',
    },
    papyrusFileSelectDialog: {
      title: 'Select a Papyrus script',
    },
    confCheckError_gamePathDoesNotExist: 'Invalid configuration: check the game path.',
    confCheckError_gameExeDoesNotExist: 'Invalid configuration: check the game path ({{gameExe}} was not found).',
    confCheckError_compilerPathDoesNotExist: 'Invalid configuration: check the Papyrus compiler path.',
    confCheckError_compilerPathIsNotAFile:
      'Invalid configuration: check the Papyrus compiler path (the path is not a file).',
    confCheckError_mo2InstanceIsNotSet:
      'Invalid configuration: You chose to use MO2 integration, but you did not specify the instance path.',
    confCheckError_mo2InstanceDoesNotExist: 'Invalid configuration: Check the MO2 instance path.',
    confCheckError_mo2InstanceNoModsFolder:
      'Invalid configuration: Check the MO2 instance path (the "mods" folder was not found).',
    confCheckError_creationKitScriptDoesNotExist:
      'Invalid configuration: Check the game path (scripts from CreationKit do not exist). Have you extracted the Scripts.zip file?',
    confCheckError_fatalError:
      'An unknown error occurred during configuration check. If you believe this is a bug in PCA, check the log files and seek support on the PCA forum on NexusMods. You can find help in the documentation.',
    confCheckError_unknown: '$t(common.confCheckError_fatalError)',
    refresh: 'Refresh',
    reset: 'Reset',
    documentation: 'Documentation',
    copy: 'Copy',
    copySuccess: 'Copied successfully',
    copyError: 'Error copying: {{error}}',
    error: 'Error',
    createGroup: 'Create a group',
    removeRecentScriptsError: 'Error removing recent scripts: {{error}}',
    youAreUsingLatestVersion: 'You are using the latest version of PCA',
    newVersionAvailable: 'New version available ({{version}})',
    changelogs: 'Changelogs <0>{{version}}</0>',
    seeChangelogs: 'Changelogs',
    download: 'Download',
    openInBrowser: 'Open in browser',
    settingsTutorial: {
      welcome: {
        title: 'Configure PCA',
        firstStartText:
          'This is your first time using PCA. We recommend following the tutorial to get familiar with the application.',
        documentationText:
          'Make sure you have all the prerequisites. You can refer to the <0>documentation</0> for more information.',
        needHelpText: 'This is my first time using PCA',
      },
      settings: {
        game: 'Start by saving your game details.',
        compiler:
          'Next, specify the path to the Papyrus compiler, which will be available after installing Creation Kit.',
        concurrent:
          'Optionally, you can set the number of scripts to compile simultaneously. Increasing this number can speed up compilation but will also increase your CPU usage.',
        mo2: 'You may add information about your MO2 instance. Note that this step is not necessary if you are using PCA through MO2.',
      },
      compilation: {
        addScripts: 'Continue by adding scripts.',
        compile:
          'You will then find the list of scripts to compile. At this stage, you can create groups to quickly add a set of scripts.',
        createGroupFromScriptsList: 'You can create a group from the current list of scripts.',
      },
      documentation: 'Remember that you can always refer to the documentation for additional information.',
    },
    telemetry: {
      title: 'Share Analysis',
      description:
        'Contribute to the improvement of PCA by allowing the automatic sending of anonymous diagnostic and usage data.',
    },
    refuse: 'Refuse',
    accept: 'Accept',
    appConfLoadError: {
      title: 'Error loading. Your configuration appears to be invalid.',
      content:
        'Try resetting PCA configuration. You can find more details in the logs. Logs are required to get help with errors.',
      openLogFile: 'Open log file',
      openConfFile: 'Open configuration file',
      resetError: 'Error resetting configuration',
    },
    restartLater: 'Restart later',
    restartNow: 'Restart now',
  },
  nav: {
    compilation: 'Compilation',
    groups: 'Groups',
    settings: 'Settings',
    logs: 'Logs',
    help: 'Help',
    drawerClose: 'Close',
  },
  dialog: {
    recentFiles: {
      title: 'Recent Files',
      noRecentFiles: 'No recent files',
      actions: {
        moreDetails: 'More details',
        load: 'Load',
      },
    },
    logs: {
      title: 'Logs',
      noLogs: 'No logs',
      displayErrorOnly: 'Display errors only',
    },
    group: {
      dropScripts: 'Drag and drop your scripts here',
      name: {
        label: 'Name',
      },
      removing: {
        title: 'Remove a Group',
        content: 'The group "{{name}}" will be removed.',
      },
    },
    openDocumentation: {
      title: 'PCA Documentation',
      text: 'You are about to access the PCA documentation website. This site contains all the required information for using and configuring PCA.\n\nIf you encounter any issues, after checking the "Troubleshooting" section in the documentation, feel free to submit a message on NexusMods.',
      actions: {
        doNotShowAgain: 'Do not show again',
      },
    },
    logLevelChanged: {
      title: 'Log Level',
      content: 'The log level has been changed. Please restart PCA to apply the changes.',
    },
  },
  page: {
    compilation: {
      dragAndDropText: 'Drag and drop psc files to load them',
      dragAndDropAdmin:
        'Please note that if PCA is running in administrator mode, this specific feature will not be available.',
      appBar: {
        title: 'Compilation',
      },
    },
    groups: {
      createGroupText:
        'You have the option to create a group. Such a group corresponds to a set of scripts designed to be quickly added to the compilation.',
      appBar: {
        title: 'Groups',
      },
    },
    settings: {
      appBar: {
        title: 'Settings',
      },
      sections: {
        game: {
          title: 'Game',
          description: 'Please add the information about your environment.',
          games: {
            le: 'Skyrim LE',
            se: 'Skyrim SE/AE',
            vr: 'Skyrim VR',
            fo4: 'Fallout 4',
          },
          gameFolder: {
            label: 'Game Folder',
            tooltip: 'Folder where {{executable}} is located',
          },
          compiler: {
            label: 'Papyrus Compiler',
            tooltip:
              'Path to PapyrusCompiler.exe file. The file is available after installing Creation Kit. More information can be found in PCA documentation.',
          },
        },
        compilation: {
          title: 'Compilation',
          description: 'Optional information about the compilation process.',
          concurrentScripts: {
            label: 'Number of Concurrently Compiled Scripts',
            helperText:
              'If you experience any freezes when starting the compilation, we recommend reducing this number.',
          },
        },
        mo2: {
          title: 'Mod Organizer 2',
          description:
            'If you are using PCA outside of MO2, please add the information of the MO2 instance you are using.',
          use: {
            helperText:
              'If PCA is not launched through MO2, you can enable MO2 integration. For more information, refer to PCA documentation.',
          },
          instance: {
            label: 'Instance Folder',
          },
          activateIntegration: 'Activate MO2 Integration',
        },
        theme: {
          title: 'Theme',
          description: 'Configure the appearance of PCA',
          options: {
            system: 'System',
            light: 'Light',
            dark: 'Dark',
          },
          activateTelemetry: 'Activate Telemetry',
        },
        logLevel: {
          title: 'Log Level',
          description: 'Set the log level. Logs are required to get help with errors.',
          options: {
            error: 'Errors',
            warn: 'Warnings',
            info: 'Information',
            debug: 'Debug',
            trace: 'Trace',
          },
        },
      },
    },
  },
}

export default en
