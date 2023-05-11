/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

export interface TranslationSchema {
  common: {
    back: string
    next: string
    skip: string
    close: string
    cancel: string
    clearList: string
    confirm: string
    create: string
    start: string
    remove: string
    searchScripts: string
    moreDetails: string
    lessDetails: string
    edit: string
    noScripts: string
    group: string
    recentFiles: string
    activate: string
    failed: string
    succeeded: string
    actions: string
    select: {
      file: string
      folder: string
      all: string
      none: string
      invert: string
    }
    papyrusFileSelectDialog: {
      title: string
    }
    confCheckError_gamePathDoesNotExist: string
    confCheckError_gameExeDoesNotExist: string
    confCheckError_compilerPathDoesNotExist: string
    confCheckError_compilerPathIsNotAFile: string
    confCheckError_mo2InstanceIsNotSet: string
    confCheckError_mo2InstanceDoesNotExist: string
    confCheckError_mo2InstanceNoModsFolder: string
    confCheckError_creationKitScriptDoesNotExist: string
    confCheckError_fatalError: string
    confCheckError_unknown: string
    refresh: string
    documentation: string
    copy: string
    copySuccess: string
    copyError: string
    createGroup: string
    removeRecentScriptsError: string
    youAreUsingLatestVersion: string
    newVersionAvailable: string
    download: string
    changelogs: string
    seeChangelogs: string
    openInBrowser: string
    settingsTutorial: {
      welcome: {
        title: string
        firstStartText: string
        documentationText: string
        needHelpText: string
      }
      settings: {
        game: string
        compiler: string
        concurrent: string
        mo2: string
      }
      compilation: {
        addScripts: string
        compile: string
        createGroupFromScriptsList: string
      }
      groups: {
        whatAreGroups: string
      }
      documentation: string
    }
    telemetry: {
      title: string
      text: string
    }
    refuse: string
    accept: string
  }
  nav: {
    compilation: string
    groups: string
    settings: string
    logs: string
    help: string
    drawerClose: string
  }
  dialog: {
    recentFiles: {
      title: string
      noRecentFiles: string
      actions: {
        moreDetails: string
        load: string
      }
    }
    logs: {
      title: string
      noLogs: string
      displayErrorOnly: string
    }
    group: {
      dropScripts: string
      name: {
        label: string
      }
      removing: {
        title: string
        content: string
      }
    }
    openDocumentation: {
      title: string
      text: string
      actions: {
        doNotShowAgain: string
      }
    }
  }
  page: {
    compilation: {
      dragAndDropText: string
      dragAndDropAdmin: string
      appBar: {
        title: string
      }
    }
    groups: {
      createGroupText: string
      whatIsAGroup: string
      appBar: {
        title: string
      }
    }
    settings: {
      appBar: {
        title: string
      }
      sections: {
        game: {
          title: string
          games: {
            le: string
            se: string
            vr: string
            fo4: string
          }
          gameFolder: {
            label: string
            tooltip: string
          }
          compiler: {
            label: string
            tooltip: string
          }
        }
        compilation: {
          title: string
          concurrentScripts: {
            label: string
            helperText: string
          }
        }
        mo2: {
          title: string
          use: {
            helperText: string
          }
          instance: {
            label: string
          }
          activateIntegration: string
        }
        theme: {
          title: string
          options: {
            system: string
            light: string
            dark: string
          }
          activateTelemetry: string
        }
      }
    }
  }
}
