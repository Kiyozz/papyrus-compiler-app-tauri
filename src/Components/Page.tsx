/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Paper from '@mui/material/Paper'
import { useApp } from 'App/Hooks/UseApp'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

function Page({ children }: PropsWithChildren) {
  const {
    drawer: [isDrawerOpen],
  } = useApp()

  return (
    <Paper
      component="main"
      className={clsx(
        'flex min-h-app w-screen flex-col rounded-none p-6 transition-[padding-left] duration-[225ms] ease-sharp',
        isDrawerOpen ? 'pl-[13.5rem]' : 'pl-20',
      )}
    >
      {children}
    </Paper>
  )
}

export default Page
