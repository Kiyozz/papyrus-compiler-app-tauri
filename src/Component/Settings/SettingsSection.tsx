/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Paper, { type PaperProps } from '@mui/material/Paper'
import Typography, { type TypographyProps } from '@mui/material/Typography'
import is from '@sindresorhus/is'
import cx from 'classnames'
import { forwardRef, type ReactNode } from 'react'

const SettingsSection = forwardRef<
  HTMLDivElement,
  Omit<PaperProps, 'title' | 'ref'> & {
    sectionTitle: ReactNode
    gutterTop?: boolean
    titleProps?: TypographyProps<'h3'>
  }
>(({ sectionTitle, className, 'aria-label': ariaLabel, gutterTop = true, titleProps, children, ...props }, ref) => (
  <Paper
    className={cx('relative p-4 transition-none', gutterTop && 'mt-4', className)}
    variant="outlined"
    aria-label={is.string(sectionTitle) ? sectionTitle : ariaLabel}
    aria-labelledby={is.string(titleProps?.id) ? titleProps?.id : undefined}
    ref={ref}
    {...props}
  >
    <Typography className="dark:text-white" component="h3" fontWeight="bold" gutterBottom variant="h5" {...titleProps}>
      {sectionTitle}
    </Typography>

    {children}
  </Paper>
))

SettingsSection.displayName = 'SettingsSection'

export default SettingsSection
