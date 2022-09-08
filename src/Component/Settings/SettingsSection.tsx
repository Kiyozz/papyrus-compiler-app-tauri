/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Paper, { PaperProps } from '@mui/material/Paper'
import Typography, { TypographyProps } from '@mui/material/Typography'
import is from '@sindresorhus/is'
import clsx from 'clsx'
import { ReactNode } from 'react'

function SettingsSection({
  title,
  className,
  'aria-label': ariaLabel,
  gutterTop = true,
  titleProps,
  children,
  ...props
}: PaperProps & {
  title: ReactNode
  gutterTop?: boolean
  titleProps?: TypographyProps<'h3'>
}) {
  return (
    <Paper
      className={clsx('relative p-4 transition-none', gutterTop && 'mt-4', className)}
      variant="outlined"
      aria-label={is.string(title) ? title : ariaLabel}
      aria-labelledby={is.string(titleProps?.id) ? titleProps?.id : undefined}
      {...props}
    >
      <Typography
        className="dark:text-white"
        component="h3"
        fontWeight="bold"
        gutterBottom
        variant="h5"
        {...titleProps}
      >
        {title}
      </Typography>

      {children}
    </Paper>
  )
}

export default SettingsSection
