/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { DarkMode } from 'App/Type/DarkMode'
import { useBooleanLocalStorage } from 'App/Util/UseBooleanLocalStorage'
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'
import useLocalStorage from 'react-use-localstorage'

type ContextType = {
  drawer: [boolean, Dispatch<SetStateAction<boolean>>]
  dark: [DarkMode, Dispatch<SetStateAction<DarkMode>>]
  dialogs: {
    logs: [boolean, Dispatch<SetStateAction<boolean>>]
    openDocumentation: {
      show: [boolean, Dispatch<SetStateAction<boolean>>]
      doNotShowAgain: [boolean, Dispatch<SetStateAction<boolean>>]
    }
  }
}

const Context = createContext<ContextType>({} as ContextType)

function AppProvider({ children }: PropsWithChildren) {
  const logs = useState(false)
  const openDocumentation = useState(false)
  const doNotShowOpenDocumentationAgain = useBooleanLocalStorage('doNotShowAnymoreDocumentationDialog', false)
  const drawerOpen = useBooleanLocalStorage('isDrawerOpen', false)
  const dark = useLocalStorage('darkMode', 'system') as [DarkMode, Dispatch<SetStateAction<DarkMode>>]

  return (
    <Context.Provider
      value={{
        drawer: drawerOpen,
        dark,
        dialogs: {
          logs,
          openDocumentation: {
            show: openDocumentation,
            doNotShowAgain: doNotShowOpenDocumentationAgain,
          },
        },
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useApp() {
  return useContext(Context)
}

export default AppProvider
