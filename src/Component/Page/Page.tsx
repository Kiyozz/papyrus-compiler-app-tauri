/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Paper from '@mui/material/Paper'
import { useApp } from 'App/Hook/UseApp'
import clsx from 'clsx'
import { PropsWithChildren } from 'react'

function Page({ children, className }: PropsWithChildren<{ className?: string }>) {
  const {
    drawer: [isDrawerExpanded],
  } = useApp()

  return (
    <Paper
      component="main"
      className={clsx(
        'min-h-app w-screen rounded-none p-6 transition-[padding-left] duration-[225ms] ease-sharp',
        isDrawerExpanded ? 'pl-[13.5rem]' : 'pl-20',
        className,
      )}
    >
      {children}
    </Paper>
  )
}

export default Page
