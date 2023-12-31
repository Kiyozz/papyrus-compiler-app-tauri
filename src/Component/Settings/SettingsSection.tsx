/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import is from '@sindresorhus/is'
import { twMerge } from 'tailwind-merge'
import { LayoutGroup, motion } from 'framer-motion'
import { type ComponentProps, forwardRef, type PropsWithChildren, type ReactNode } from 'react'

const SettingsSection = forwardRef<
  HTMLDivElement,
  Omit<ComponentProps<typeof motion.div>, 'title' | 'ref' | 'children'> &
    PropsWithChildren<{
      title: ReactNode
      description: ReactNode
    }>
>(({ title, className, description, 'aria-label': ariaLabel, children, ...props }, ref) => (
  <LayoutGroup>
    <motion.section
      className={twMerge('relative p-4 pb-12 transition-none last:border-b-0 last:pb-4', className)}
      aria-label={is.string(title) ? title : ariaLabel}
      ref={ref}
      layout
      layoutId={props.id}
      transition={{ duration: 0.15, type: 'spring', stiffness: 500, damping: 30 }}
      key={props.id}
      {...props}
    >
      <motion.h3 className="font-semibold leading-7 text-gray-900 dark:text-gray-100" layout>
        {title}
      </motion.h3>
      <motion.p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400" layout>
        {description}
      </motion.p>

      {children}
    </motion.section>
  </LayoutGroup>
))

SettingsSection.displayName = 'SettingsSection'

export default SettingsSection
