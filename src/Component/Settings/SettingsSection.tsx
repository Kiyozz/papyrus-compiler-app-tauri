/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Paper from '@mui/material/Paper'
import Typography, { type TypographyProps } from '@mui/material/Typography'
import is from '@sindresorhus/is'
import cx from 'classnames'
import { type HTMLMotionProps, LayoutGroup, motion } from 'framer-motion'
import { type ComponentProps, forwardRef, type ReactNode } from 'react'

const MotionPaper = motion(Paper)

const SettingsSection = forwardRef<
  HTMLDivElement,
  Omit<ComponentProps<typeof MotionPaper>, 'title' | 'ref'> & {
    sectionTitle: ReactNode
    gutterTop?: boolean
    titleProps?: TypographyProps<'h3'> & HTMLMotionProps<'h3'>
  }
>(({ sectionTitle, className, 'aria-label': ariaLabel, gutterTop = true, titleProps, children, ...props }, ref) => (
  <LayoutGroup>
    <MotionPaper
      className={cx('relative p-4 transition-none', gutterTop && 'mt-4', className)}
      variant="outlined"
      aria-label={is.string(sectionTitle) ? sectionTitle : ariaLabel}
      aria-labelledby={is.string(titleProps?.id) ? titleProps?.id : undefined}
      ref={ref}
      layout
      layoutId={props.id}
      transition={{ duration: 0.15, type: 'spring', stiffness: 500, damping: 30 }}
      key={props.id}
      {...props}
    >
      <Typography
        className="dark:text-white"
        component={motion.h3}
        fontWeight="bold"
        gutterBottom
        variant="h5"
        layout
        {...titleProps}
      >
        {sectionTitle}
      </Typography>

      {children}
    </MotionPaper>
  </LayoutGroup>
))

SettingsSection.displayName = 'SettingsSection'

export default SettingsSection
