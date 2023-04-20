/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import {
  CheckCircleIcon,
  Cog8ToothIcon,
  QuestionMarkCircleIcon,
  RectangleGroupIcon,
  ChevronLeftIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import ActiveLink from 'App/Component/ActiveLink'
import AnimateAppLogo from 'App/Component/AnimateAppLogo'
import TutorialTooltip, { type TutorialTooltipProps } from 'App/Component/Tutorial/Settings/TutorialTooltip'
import { useCompilationLogs } from 'App/Hook/CompilationLogs/UseCompilationLogs'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useDialogs } from 'App/Hook/UseDialogs'
import { useDocumentation } from 'App/Hook/UseDocumentation'
import { isQueryNonNullable } from 'App/Lib/IsQueryNonNullable'
import cx from 'classnames'
import { type ElementType } from 'react'
import { useTranslation } from 'react-i18next'

type DrawerLink = {
  id: string
  label: string
  icon: ElementType
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

const DrawerIcon = ({ icon: Icon, className: defaultClassName }: { icon: ElementType; className?: string }) => {
  const Comp = ({ className }: { className?: string }) => (
    <Icon className={cx('h-6 w-6 shrink-0', defaultClassName, className)} aria-hidden="true" />
  )

  Comp.displayName = 'DrawerIcon'

  return Comp
}

function Drawer() {
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
      icon: DrawerIcon({ icon: QuestionMarkCircleIcon }),
      path: '/',
    },
    {
      id: 'groups',
      label: t('nav.groups'),
      icon: DrawerIcon({ icon: RectangleGroupIcon }),
      path: '/groups',
    },
    {
      id: 'settings',
      label: t('nav.settings'),
      icon: DrawerIcon({ icon: Cog8ToothIcon }),
      path: '/settings',
    },
  ] satisfies DrawerLink[]

  const endLinks = [
    {
      id: 'logs',
      label: t('nav.logs'),
      icon: hasAllSuccess
        ? DrawerIcon({
            icon: CheckCircleIcon,
            className: 'text-green-500',
          })
        : DrawerIcon({
            icon: ExclamationTriangleIcon,
            className: cx(hasAnyError && 'text-red-300'),
          }),
      onClick: () => {
        // open logs dialog
        setCompilationLogsDialogOpen(true)
      },
    },
    {
      id: 'help',
      label: t('nav.help'),
      icon: DrawerIcon({ icon: QuestionMarkCircleIcon }),
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
      icon: DrawerIcon({
        icon: ChevronLeftIcon,
        className: cx(
          'transition-transform duration-[225ms] ease-sharp',
          conf.data?.misc.drawerOpen ? 'rotate-0' : 'rotate-180',
        ),
      }),
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
    <div
      className={cx(
        'fixed inset-y-0 flex flex-col',
        conf.data.misc.drawerOpen ? 'w-48' : 'w-14',
        'z-30 transition-[width] duration-[225ms] ease-sharp',
      )}
    >
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600">
        <nav className="flex flex-1 flex-col">
          <div className="mt-4 flex justify-center">
            <AnimateAppLogo animate={false} className="h-12 w-12" />
          </div>
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li className="mt-4">
              <ul role="list" className="-mx-2 space-y-1">
                {links.map(({ id, label, path, icon: Icon }) => (
                  <li key={id}>
                    <ActiveLink
                      to={path}
                      className="group flex gap-x-3 rounded-md p-2 px-6 text-sm font-semibold leading-6"
                      activeClassName="bg-indigo-700 text-white"
                      nonActiveClassName="text-indigo-200 hover:bg-indigo-700 hover:text-white"
                    >
                      {({ isActive }) => (
                        <>
                          <Icon className={cx(isActive ? 'text-white' : 'text-indigo-200 group-hover:text-white')} />
                          <span className="truncate">{label}</span>
                        </>
                      )}
                    </ActiveLink>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mb-4 mt-auto">
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {endLinks.map(({ id, label, icon: Icon, tutorial, onClick }) => {
                  const item = (
                    <button
                      onClick={onClick}
                      className="group flex w-full gap-x-3 rounded-md p-2 px-6 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                    >
                      <span className="flex h-6 w-6 shrink-0 group-hover:text-white">
                        <Icon />
                      </span>
                      <span className="truncate">{label}</span>
                    </button>
                  )

                  return (
                    <li key={id}>
                      {tutorial == null ? item : <TutorialTooltip {...tutorial}>{item}</TutorialTooltip>}
                    </li>
                  )
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Drawer
