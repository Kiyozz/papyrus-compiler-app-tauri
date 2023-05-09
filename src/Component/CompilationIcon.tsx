/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { BellSnoozeIcon, BoltIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { type FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilation'
import { fadeAnimate } from 'App/Lib/Framer'
import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import { match } from 'ts-pattern'

const MotionBoltIcon = motion(BoltIcon)
const MotionBellSnoozeIcon = motion(BellSnoozeIcon)
const MotionCheckCircleIcon = motion(CheckCircleIcon)
const MotionExclamationCircleIcon = motion(ExclamationCircleIcon)

export type CompilationIconElement = SVGSVGElement
export type CompilationIconProps = { script: FileScriptCompilation }

export const CompilationIcon = forwardRef<CompilationIconElement, CompilationIconProps>(({ script }, ref) => {
  return match(script.status)
    .with('idle', () => null)
    .with('running', () => (
      <MotionBoltIcon ref={ref} className="h-6 w-6 text-blue-400 dark:text-blue-600" {...fadeAnimate} />
    ))
    .with('busy', () => (
      <MotionBellSnoozeIcon ref={ref} className="h-6 w-6 text-gray-400 dark:text-gray-600" {...fadeAnimate} />
    ))
    .with('done', () => (
      <MotionCheckCircleIcon ref={ref} className="h-6 w-6 text-green-400 dark:text-green-400" {...fadeAnimate} />
    ))
    .with('error', () => <MotionExclamationCircleIcon ref={ref} className="h-6 w-6 text-red-400" {...fadeAnimate} />)
    .exhaustive()
})

CompilationIcon.displayName = 'CompilationIcon'
