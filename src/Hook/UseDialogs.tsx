/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { createContext, type Dispatch, type PropsWithChildren, type SetStateAction, useContext, useState } from 'react'

interface ContextType {
  compilationLogs: [boolean, Dispatch<SetStateAction<boolean>>]
  openDocumentation: [boolean, Dispatch<SetStateAction<boolean>>]
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const Context = createContext<ContextType>({} as ContextType)

function DialogsProvider({ children }: PropsWithChildren) {
  const compilationLogs = useState(false)
  const openDocumentation = useState(false)

  return (
    <Context.Provider
      value={{
        compilationLogs,
        openDocumentation,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export function useDialogs() {
  return useContext(Context)
}

export default DialogsProvider
