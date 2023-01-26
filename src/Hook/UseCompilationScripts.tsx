/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useScriptsList } from 'App/Hook/UseScriptsList'
import { FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'
import { createContext, PropsWithChildren, useContext } from 'react'

const Context = createContext({} as ReturnType<typeof useScriptsList<FileScriptCompilation>>)

const CompilationScriptsProvider = ({ children }: PropsWithChildren) => {
  const list = useScriptsList({ initialScripts: [] as FileScriptCompilation[] })

  return <Context.Provider value={list}>{children}</Context.Provider>
}

export const useCompilationScripts = () => {
  return useContext(Context)
}

export default CompilationScriptsProvider
