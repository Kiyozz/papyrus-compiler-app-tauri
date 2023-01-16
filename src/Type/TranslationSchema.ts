/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

export type TranslationSchema = {
  common: {
    close: string
    cancel: string
    clear: string
    confirm: string
    create: string
    start: string
    remove: string
    searchScripts: string
    moreDetails: string
    edit: string
    noScripts: string
    group: string
    recentFiles: string
    select: {
      file: string
      folder: string
    }
    papyrusFileSelectDialog: {
      title: string
    }
    confCheckError_gamePathDoesNotExist: string
    confCheckError_gameExeDoesNotExist: string
    confCheckError_compilerPathDoesNotExist: string
    confCheckError_mo2InstanceIsNotSet: string
    confCheckError_mo2InstanceDoesNotExist: string
    confCheckError_mo2InstanceNoModsFolder: string
    confCheckError_creationKitScriptDoesNotExist: string
    confCheckError_fatalError: string
    confCheckError_unknown: string
    refresh: string
    documentation: string
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
            label: string
            helperText: string
          }
          instance: {
            label: string
          }
        }
        theme: {
          title: string
          options: {
            system: string
            light: string
            dark: string
          }
        }
        telemetry: {
          title: string
          use: {
            label: string
          }
        }
      }
    }
  }
}
