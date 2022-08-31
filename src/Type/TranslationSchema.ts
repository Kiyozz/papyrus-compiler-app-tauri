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
      title: string
      dropScripts: string
      actions: {
        edit: string
        create: string
        searchScripts: string
      }
    }
  }
  page: {
    compilation: {
      dragAndDropText: string
      dragAndDropAdmin: string
      appBar: {
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
        actions: {
          create: string
        }
      }
    }
    settings: {
      appBar: {
        actions: {
          documentation: string
          refresh: string
        }
      }
    }
  }
}
