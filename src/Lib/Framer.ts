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
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.075 } },
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

export const fadeEaseAnimate: AnimationProps = {
  animate: {
    transition: {
      ease: 'easeOut',
      duration: 0.2,
    },
    opacity: 1,
  },
  initial: { opacity: 0 },
  exit: {
    opacity: 0,
    transition: { ease: 'easeIn', duration: 0.2 },
  },
}

export const fadeScaleAnimate: AnimationProps = {
  animate: {
    transition: {
      ease: 'easeOut',
      duration: 0.3,
    },
    opacity: 1,
    scale: 1,
  },
  initial: {
    opacity: 0,
    scale: 0.97,
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { ease: 'easeIn', duration: 0.2 },
  },
}

export const swapOnAnimate: AnimationProps = {
  animate: {
    rotate: 0,
    opacity: 1,
  },
  initial: {
    rotate: 45,
    opacity: 0,
  },
  exit: {
    rotate: 45,
    opacity: 0,
  },
  transition: {
    duration: 0.2,
  },
}

export const swapOffAnimate: AnimationProps = {
  animate: {
    rotate: 0,
    opacity: 1,
  },
  initial: {
    rotate: -45,
    opacity: 0,
  },
  exit: {
    rotate: -45,
    opacity: 0,
  },
  transition: {
    duration: 0.2,
  },
}

export function withDelay(delay: number, props: AnimationProps): AnimationProps {
  return {
    ...props,
    transition: { ...props.transition, delay },
  }
}
