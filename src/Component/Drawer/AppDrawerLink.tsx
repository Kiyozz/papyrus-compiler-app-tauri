/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import ListItem, { ListItemProps } from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ActiveLink from 'App/Component/ActiveLink'
import TutorialTooltip, { TutorialTooltipProps } from 'App/Component/Tutorial/TutorialTooltip'
import { forwardRef, ReactNode } from 'react'

const AppDrawerLink = forwardRef<
  HTMLLIElement,
  {
    icon: ReactNode
    id: string
    label: string
    path?: string
    onClick?: () => void
    tutorial?: Omit<TutorialTooltipProps, 'children'>
  } & Omit<ListItemProps, 'ref'>
>(({ icon, id, label, path, onClick, tutorial, ...props }, ref) => {
  const item = path ? (
    <ListItem aria-label={label} key={id} disablePadding ref={ref} {...props}>
      <ListItemButton
        component={ActiveLink}
        to={path}
        activeClassName="bg-light-800 hover:bg-light-800 dark:bg-black-400 dark:text-white dark:hover:bg-black-400 dark:hover:text-white"
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} primaryTypographyProps={{ noWrap: true }} />
      </ListItemButton>
    </ListItem>
  ) : (
    <ListItem key={id} disablePadding ref={ref} {...props}>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} primaryTypographyProps={{ noWrap: true }} />
      </ListItemButton>
    </ListItem>
  )

  if (!tutorial) return item

  return <TutorialTooltip {...tutorial}>{item}</TutorialTooltip>
})

AppDrawerLink.displayName = 'AppDrawerLink'

export default AppDrawerLink
