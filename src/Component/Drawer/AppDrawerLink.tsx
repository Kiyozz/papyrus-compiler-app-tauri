/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ActiveLink from 'App/Component/ActiveLink'
import React from 'react'

type AppDrawerLinkProps = {
  Icon: React.ComponentType
  id: string
  label: string
  path?: string
  onClick?: () => void
}

function AppDrawerLink({ Icon, id, label, path, onClick }: AppDrawerLinkProps) {
  if (path) {
    return (
      <ListItem aria-label={label} key={id} disablePadding>
        <ListItemButton
          component={ActiveLink}
          to={path}
          activeClassName="bg-light-800 hover:bg-light-800 dark:bg-black-400 dark:text-white dark:hover:bg-black-400 dark:hover:text-white"
        >
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={label} primaryTypographyProps={{ noWrap: true }} />
        </ListItemButton>
      </ListItem>
    )
  }

  return (
    <ListItem key={id} disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={label} primaryTypographyProps={{ noWrap: true }} />
      </ListItemButton>
    </ListItem>
  )
}

export default AppDrawerLink
