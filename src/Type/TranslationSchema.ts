/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
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
    select: {
      file: string
      folder: string
    }
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
      actions: {
        edit: string
        create: string
        searchScripts: string
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
        actions: {
          recentFiles: string
          searchScripts: string
          group: string
        }
      }
    }
    groups: {
      createGroupText: string
      whatIsAGroup: string
      appBar: {
        title: string
        actions: {
          create: string
        }
      }
    }
    settings: {
      appBar: {
        title: string
        actions: {
          documentation: string
          refresh: string
        }
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
