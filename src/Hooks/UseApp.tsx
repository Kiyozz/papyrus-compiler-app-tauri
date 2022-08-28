/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { DarkMode } from 'App/Types/DarkMode'
import { useBooleanLocalStorage } from 'App/Utils/UseBooleanLocalStorage'
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext } from 'react'
import useLocalStorage from 'react-use-localstorage'

type ContextType = {
  drawer: [boolean, Dispatch<SetStateAction<boolean>>]
  dark: [DarkMode, Dispatch<SetStateAction<DarkMode>>]
}

const Context = createContext<ContextType>({} as ContextType)

function AppProvider({ children }: PropsWithChildren) {
  const drawerOpen = useBooleanLocalStorage('isDrawerOpen', false)
  const dark = useLocalStorage('darkMode', 'system') as [DarkMode, Dispatch<SetStateAction<DarkMode>>]

  return (
    <Context.Provider
      value={{
        drawer: drawerOpen,
        dark,
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
