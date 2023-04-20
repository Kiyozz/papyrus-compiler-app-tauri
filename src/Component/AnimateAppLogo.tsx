/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import cx from 'classnames'
import { type Variants, motion } from 'framer-motion'
import appLogo from 'App/Asset/app-logo.png'

const svgVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 2,
    rotate: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1.1,
      ease: 'easeInOut',
    },
  },
}

const AnimateAppLogo = ({ animate = false, className }: { animate?: boolean; className?: string }) => {
  return (
    <motion.img
      src={appLogo}
      initial="hidden"
      animate="visible"
      variants={animate ? svgVariants : undefined}
      className={cx('inline-block', className)}
    />
  )
}

export default AnimateAppLogo
