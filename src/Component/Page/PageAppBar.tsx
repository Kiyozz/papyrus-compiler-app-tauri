/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { AppBar, Toolbar, Typography } from '@mui/material'
import cx from 'classnames'
import { type PropsWithChildren } from 'react'

function PageAppBar({ title, className, children }: PropsWithChildren<{ title: string; className?: string }>) {
  return (
    <AppBar aria-label={title}>
      <Toolbar className={cx('pr-6 pl-4', className)} disableGutters>
        <Typography className="grow" variant="h4">
          {title}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  )
}

export default PageAppBar
