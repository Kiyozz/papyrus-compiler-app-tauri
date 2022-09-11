import { Store } from 'App/Service/Store'
import { Settings } from 'App/Type/Settings/Settings'
import { createContext, PropsWithChildren, useContext, useEffect, useRef } from 'react'

const Context = createContext({} as Store<Settings>)

function SettingsProvider({ children, store }: PropsWithChildren<{ store: Store<Settings> }>) {
  return <Context.Provider value={store}>{children}</Context.Provider>
}

export function useSettings() {
  return useContext(Context)
}

export default SettingsProvider
