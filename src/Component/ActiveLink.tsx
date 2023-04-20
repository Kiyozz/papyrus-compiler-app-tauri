/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import cx from 'classnames'
import { forwardRef } from 'react'
import { NavLink, type NavLinkProps } from 'react-router-dom'

type ActiveLinkProps = NavLinkProps & {
  to: string
  className?: string
  activeClassName?: string
  nonActiveClassName?: string
  children?: NavLinkProps['children']
}

const ActiveLink = forwardRef<HTMLAnchorElement, ActiveLinkProps>(function ActiveLink(
  { className, activeClassName, nonActiveClassName, children, ...props },
  ref,
) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) => {
        return cx(className, isActive ? activeClassName : nonActiveClassName)
      }}
      ref={ref}
    >
      {children}
    </NavLink>
  )
})

ActiveLink.displayName = 'ActiveLink'

export default ActiveLink
