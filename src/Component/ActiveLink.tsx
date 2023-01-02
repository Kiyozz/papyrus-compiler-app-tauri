/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import cx from 'classnames'
import { forwardRef } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'

interface ActiveLinkProps extends NavLinkProps {
  to: string
  className?: string
  activeClassName?: string
}

const ActiveLink = forwardRef<HTMLAnchorElement, ActiveLinkProps>(function ActiveLink(
  { className, activeClassName, children, ...props },
  ref,
) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) => {
        return cx(className, isActive && activeClassName)
      }}
      ref={ref}
    >
      {children}
    </NavLink>
  )
})

export default ActiveLink
