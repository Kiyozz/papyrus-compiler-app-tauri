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
  ExclamationTriangleIcon,
  PlayIcon,
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline'
import AnimateAppLogo from 'App/Component/AnimateAppLogo'
import TutorialTooltip, { type TutorialTooltipProps } from 'App/Component/Tutorial/Settings/TutorialTooltip'
import { useCompilationLogs } from 'App/Hook/CompilationLogs/UseCompilationLogs'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useDialogs } from 'App/Hook/UseDialogs'
import { useDocumentation } from 'App/Hook/UseDocumentation'
import { isQueryNonNullable } from 'App/Lib/IsQueryNonNullable'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

type DrawerLink = {
  id: string
  label: string
  icon: JSX.Element
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

const ArrowRightCircleIconMotion = motion(ArrowRightCircleIcon)
const ArrowLeftCircleIconMotion = motion(ArrowLeftCircleIcon)

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
      icon: <PlayIcon />,
      path: '/',
    },
    {
      id: 'groups',
      label: t('nav.groups'),
      icon: <RectangleGroupIcon />,
      path: '/groups',
    },
    {
      id: 'settings',
      label: t('nav.settings'),
      icon: <Cog8ToothIcon />,
      path: '/settings',
    },
  ] satisfies DrawerLink[]

  const endLinks = [
    {
      id: 'logs',
      label: t('nav.logs'),
      icon: hasAllSuccess ? (
        <CheckCircleIcon className="text-green-500 group-hover:text-green-400" />
      ) : (
        <ExclamationTriangleIcon className={twMerge(hasAnyError && 'text-red-400 group-hover:text-red-600')} />
      ),
      onClick: () => {
        // open logs dialog
        setCompilationLogsDialogOpen(true)
      },
    },
    {
      id: 'help',
      label: t('nav.help'),
      icon: <QuestionMarkCircleIcon />,
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
      icon: (
        <span className="relative w-full">
          <AnimatePresence>
            {conf.data.misc.drawerOpen ? (
              <ArrowLeftCircleIconMotion
                key="left"
                animate={{
                  rotate: 0,
                  opacity: 1,
                }}
                initial={{
                  rotate: 45,
                  opacity: 0,
                }}
                exit={{
                  opacity: 0,
                  rotate: 45,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="absolute inset-0"
              />
            ) : (
              <ArrowRightCircleIconMotion
                key="right"
                animate={{
                  rotate: 0,
                  opacity: 1,
                }}
                initial={{
                  rotate: -45,
                  opacity: 0,
                }}
                exit={{
                  opacity: 0,
                  rotate: -45,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="absolute inset-0"
              />
            )}
          </AnimatePresence>
        </span>
      ),
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
      className={twMerge(
        'fixed inset-y-0 flex flex-col',
        conf.data.misc.drawerOpen ? 'w-48' : 'w-14',
        'z-30 transition-[width] duration-[225ms] ease-sharp',
      )}
    >
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary-700">
        <nav className="flex flex-1 flex-col">
          <div className="mt-4 flex justify-center">
            <AnimateAppLogo animate={false} className="h-12 w-12" />
          </div>
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li className="mt-4">
              <ul role="list" className="-mx-2 space-y-1">
                {links.map(({ id, label, path, icon }) => (
                  <li key={id}>
                    <NavLink
                      to={path}
                      className="group flex gap-x-3 rounded-md p-2 px-6 text-sm font-semibold leading-6 text-primary-100 hover:bg-primary-600 hover:text-white aria-[current=page]:bg-primary-600 aria-[current=page]:text-white"
                    >
                      <span className="flex h-6 w-6 shrink-0 group-hover:text-white">{icon}</span>
                      <span className="truncate">{label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mb-4 mt-auto">
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {endLinks.map(({ id, label, icon, tutorial, onClick }) => {
                  const item = (
                    <button
                      onClick={onClick}
                      className="group flex w-full gap-x-3 rounded-md p-2 px-6 text-sm font-semibold leading-6 text-primary-100 hover:bg-primary-600 hover:text-white"
                    >
                      <span className="flex h-6 w-6 shrink-0 group-hover:text-white">{icon}</span>
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
