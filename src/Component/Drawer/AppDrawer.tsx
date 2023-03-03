/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
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
import { type TutorialTooltipProps } from 'App/Component/Tutorial/Settings/TutorialTooltip'
import { useCompilationLogs } from 'App/Hook/CompilationLogs/UseCompilationLogs'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useDialogs } from 'App/Hook/UseDialogs'
import { useDocumentation } from 'App/Hook/UseDocumentation'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { isQueryNonNullable } from 'App/Lib/IsQueryNonNullable'
import cx from 'classnames'
import { type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

type DrawerLink = {
  id: string
  label: string
  icon: ReactNode
  tutorial?: Omit<TutorialTooltipProps, 'children'>
} & (
  | {
      path: string
      onClick?: never
    }
  | {
      path?: never
      onClick: () => void
    }
)

function AppDrawer() {
  const { t } = useTranslation()
  const { open } = useDocumentation()
  const {
    compilationLogs: [, setCompilationLogsDialogOpen],
    openDocumentation: [, setOpenDocumentationDialogOpen],
  } = useDialogs()
  const conf = useConf()
  const updateConf = useUpdateConf()
  const { hasAllSuccess, hasAnyError } = useCompilationLogs()
  const { refs } = useSettingsTutorial()

  if (!isQueryNonNullable(conf)) return <>Waiting...</>

  const links = [
    {
      id: 'compilation',
      label: t('nav.compilation'),
      icon: <CodeIcon />,
      path: '/',
    },
    {
      id: 'groups',
      label: t('nav.groups'),
      icon: <LayersIcon />,
      path: '/groups',
    },
    {
      id: 'settings',
      label: t('nav.settings'),
      icon: <SettingsIcon />,
      path: '/settings',
    },
  ] satisfies DrawerLink[]

  const endLinks = [
    {
      id: 'logs',
      label: t('nav.logs'),
      icon: hasAllSuccess ? (
        <CheckCircleIcon className="text-green-500" />
      ) : (
        <ErrorIcon className={cx(hasAnyError && 'text-red-300')} />
      ),
      onClick: () => {
        // open logs dialog
        setCompilationLogsDialogOpen(true)
      },
    },
    {
      id: 'help',
      label: t('nav.help'),
      icon: <HelpIcon />,
      onClick: () => {
        // open the doc website
        if (conf.data.misc.documentation.reminder) {
          setOpenDocumentationDialogOpen(true)
        } else {
          void open('click')
        }
      },
      tutorial: {
        ref: refs.documentation,
        placement: 'right-end',
        step: 'documentation',
        title: t('common.settingsTutorial.documentation'),
      },
    },
    {
      id: 'drawer-expand',
      label: t('nav.drawerClose'),
      icon: conf.data?.misc.drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />,
      onClick: () => {
        updateConf.mutate({
          misc: {
            drawerOpen: !conf.data.misc.drawerOpen,
          },
        })
      },
    },
  ] satisfies DrawerLink[]

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
          'overflow-x-hidden transition-[width] duration-[225ms] ease-sharp',
          conf.data.misc.drawerOpen ? 'w-48' : 'w-14',
        ),
      }}
      open={true}
      variant="permanent"
    >
      <List>
        {links.map(({ label, id, path, icon }) => (
          <AppDrawerLink key={id} icon={icon} id={id} label={label} path={path} />
        ))}
      </List>
      <List className="mt-auto">
        {endLinks.map(({ icon, id, label, onClick, tutorial }) => (
          <AppDrawerLink key={id} icon={icon} id={id} label={label} onClick={onClick} tutorial={tutorial} />
        ))}
      </List>
    </Drawer>
  )
}

export default AppDrawer
