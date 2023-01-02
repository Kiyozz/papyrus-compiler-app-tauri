/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
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
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useDialogs } from 'App/Hook/UseDialogs'
import { useDocumentation } from 'App/Hook/UseDocumentation'
import { isQueryNonNullable } from 'App/Lib/IsQueryNonNullable'
import cx from 'classnames'
import { useTranslation } from 'react-i18next'

function AppDrawer() {
  const { t } = useTranslation()
  const { open } = useDocumentation()
  const {
    logs: [, setLogsDialogOpen],
    openDocumentation: {
      show: [, setOpenDocumentationDialogOpen],
    },
  } = useDialogs()
  const conf = useConf()
  const updateConf = useUpdateConf()

  if (!isQueryNonNullable(conf)) return <>Waiting...</>

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
        if (conf.data.misc.documentation.reminder) {
          setOpenDocumentationDialogOpen(true)
        } else {
          void open('click')
        }
      },
    },
    {
      id: 'drawer-expand',
      label: t('nav.drawerClose'),
      Icon: conf.data?.misc.drawerOpen ? ChevronLeftIcon : ChevronRightIcon,
      onClick: () => {
        updateConf.mutate({
          misc: {
            drawerOpen: !conf.data!.misc.drawerOpen,
          },
        })
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
        paper: cx(
          'overflow-x-hidden transition-[width] ease-sharp duration-[225ms]',
          conf.data.misc.drawerOpen ? 'w-48' : 'w-14',
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
