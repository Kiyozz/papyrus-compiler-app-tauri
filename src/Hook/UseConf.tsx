import { useQueryClient } from '@tanstack/react-query'
import { Conf } from 'App/Service/Conf/Conf'
import { Settings } from 'App/Type/Settings/Settings'
import { createContext, PropsWithChildren, useContext, useEffect } from 'react'

const Context = createContext({} as Conf<Settings>)

function ConfProvider({ children, conf }: PropsWithChildren<{ conf: Conf<Settings> }>) {
  const queryClient = useQueryClient()

  useEffect(() => {
    const listener = (store: Settings) => {
      console.log('yo', store)
      queryClient.invalidateQueries(['conf'])
    }

    conf.on('change', listener)

    return () => {
      conf.off('change', listener)
    }
  })

  return <Context.Provider value={conf}>{children}</Context.Provider>
}

export function useConf() {
  return useContext(Context)
}

export default ConfProvider
