/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { AppBar, Toolbar, Typography } from '@mui/material'
import AnimateAppLogo from 'App/Component/AnimateAppLogo'
import cx from 'classnames'
import { type PropsWithChildren } from 'react'

function PageAppBar({ title, className, children }: PropsWithChildren<{ title: string; className?: string }>) {
  return (
    <AppBar aria-label={title}>
      <Toolbar className={cx('pr-6 pl-4', className)} disableGutters>
        <Typography className="flex grow items-center gap-4" variant="h4">
          <AnimateAppLogo />
          <span>{title}</span>
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  )
}

export default PageAppBar
