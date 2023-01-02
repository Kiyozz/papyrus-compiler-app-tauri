/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react'

type ContextType = {
  logs: [boolean, Dispatch<SetStateAction<boolean>>]
  openDocumentation: {
    show: [boolean, Dispatch<SetStateAction<boolean>>]
  }
}

const Context = createContext<ContextType>({} as ContextType)

function DialogsProvider({ children }: PropsWithChildren) {
  const logs = useState(false)
  const openDocumentation = useState(false)

  return (
    <Context.Provider
      value={{
        logs,
        openDocumentation: {
          show: openDocumentation,
        },
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
