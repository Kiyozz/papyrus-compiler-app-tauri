/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CodeIcon from '@mui/icons-material/Code'
import ErrorIcon from '@mui/icons-material/Error'
import HelpIcon from '@mui/icons-material/Help'
import LayersIcon from '@mui/icons-material/Layers'
import SettingsIcon from '@mui/icons-material/Settings'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ActiveLink from 'App/Components/ActiveLink'
import { useApp } from 'App/Hooks/UseApp'
import clsx from 'clsx'

function AppDrawer() {
  const {
    drawer: [isDrawerOpen, setDrawerOpen],
  } = useApp()

  const links = [
    {
      id: 'compilation',
      label: 'Compilation',
      Icon: CodeIcon,
      path: '/',
    },
    {
      id: 'groups',
      label: 'Groups',
      Icon: LayersIcon,
      path: '/groups',
    },
    {
      id: 'settings',
      label: 'Settings',
      Icon: SettingsIcon,
      path: '/settings',
    },
  ]

  const endLinks = [
    {
      id: 'logs',
      label: 'Logs',
      Icon: ErrorIcon,
      path: '/logs',
    },
    {
      id: 'help',
      label: 'Help',
      Icon: HelpIcon,
      onClick: () => {
        // open the doc website
      },
    },
    {
      id: 'drawer-expand',
      label: 'Close',
      Icon: isDrawerOpen ? ChevronLeftIcon : ChevronRightIcon,
      onClick: () => {
        setDrawerOpen((v) => !v)
      },
    },
  ]

  return (
    <Drawer
      PaperProps={{
        sx: {
          top: 64,
          height: `calc(100% - ${64}px)`,
        },
      }}
      classes={{
        paper: clsx('overflow-x-hidden transition-[width] ease-sharp duration-[225ms]', isDrawerOpen ? 'w-48' : 'w-14'),
      }}
      open={true}
      variant="permanent"
    >
      <List>
        {links.map(({ label, id, path, Icon }) => {
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
        })}
      </List>
      <List className="mt-auto">
        {endLinks.map(({ Icon, id, path, label, onClick }) => {
          return path ? (
            <ListItem key={id} disablePadding>
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
          ) : (
            <ListItem key={id} disablePadding>
              <ListItemButton onClick={onClick}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={label} primaryTypographyProps={{ noWrap: true }} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}

export default AppDrawer
