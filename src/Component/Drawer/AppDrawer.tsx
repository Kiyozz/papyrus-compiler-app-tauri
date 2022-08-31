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
import AppDrawerLink from 'App/Component/Drawer/AppDrawerLink'
import { useApp } from 'App/Hook/UseApp'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

function AppDrawer() {
  const { t } = useTranslation()
  const {
    drawer: [isDrawerExpanded, setDrawerExpanded],
    dialogs: {
      logs: [, setLogsDialogOpen],
      openDocumentation: [, setOpenDocumentationDialogOpen],
    },
  } = useApp()

  const links = [
    {
      id: 'compilation',
      label: t('nav.compilation'),
      Icon: CodeIcon,
      path: '/',
    },
    {
      id: 'groups',
      label: t('nav.groups'),
      Icon: LayersIcon,
      path: '/groups',
    },
    {
      id: 'settings',
      label: t('nav.settings'),
      Icon: SettingsIcon,
      path: '/settings',
    },
  ]

  const endLinks = [
    {
      id: 'logs',
      label: t('nav.logs'),
      Icon: ErrorIcon,
      onClick: () => {
        // open logs dialog
        setLogsDialogOpen(true)
      },
    },
    {
      id: 'help',
      label: t('nav.help'),
      Icon: HelpIcon,
      onClick: () => {
        // open the doc website
        setOpenDocumentationDialogOpen(true)
      },
    },
    {
      id: 'drawer-expand',
      label: t('nav.drawerClose'),
      Icon: isDrawerExpanded ? ChevronLeftIcon : ChevronRightIcon,
      onClick: () => {
        setDrawerExpanded((v) => !v)
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
        paper: clsx(
          'overflow-x-hidden transition-[width] ease-sharp duration-[225ms]',
          isDrawerExpanded ? 'w-48' : 'w-14',
        ),
      }}
      open={true}
      variant="permanent"
    >
      <List>
        {links.map(({ label, id, path, Icon }) => {
          return <AppDrawerLink key={id} Icon={Icon} id={id} label={label} path={path} />
        })}
      </List>
      <List className="mt-auto">
        {endLinks.map(({ Icon, id, label, onClick }) => {
          return <AppDrawerLink key={id} Icon={Icon} id={id} label={label} onClick={onClick} />
        })}
      </List>
    </Drawer>
  )
}

export default AppDrawer
