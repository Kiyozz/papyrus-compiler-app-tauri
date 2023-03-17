/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type AnimationProps } from 'framer-motion'

export const enterPageAnimate: AnimationProps = {
  animate: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: -10 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
  transition: { type: 'spring', duration: 0.5 },
}

export const exitAlertAnimate: AnimationProps = {
  animate: { opacity: 1, y: 0 },
  initial: { opacity: 0, y: 20 },
  exit: { opacity: 0, y: 20 },
  transition: { type: 'tween' },
}

export const fadeAnimate: AnimationProps = {
  animate: { opacity: 1 },
  initial: { opacity: 0 },
  exit: { opacity: 0 },
  transition: { type: 'tween' },
}
