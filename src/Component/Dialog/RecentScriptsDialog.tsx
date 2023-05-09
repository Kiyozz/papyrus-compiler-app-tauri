/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { TrashIcon } from '@heroicons/react/20/solid'
import is from '@sindresorhus/is'
import RecentScriptsDialogActions from 'App/Component/Dialog/RecentScriptsDialog/RecentScriptsDialogActions'
import * as Button from 'App/Component/UI/Button'
import * as Dialog from 'App/Component/UI/Dialog'
import Switch from 'App/Component/UI/Switch'
import { useRecentScripts } from 'App/Hook/RecentScripts/UseRecentScripts'
import { useUpdateRecentScripts } from 'App/Hook/RecentScripts/UseUpdateRecentScripts'
import { useKey } from 'App/Hook/UseKey'
import { useMatomo } from 'App/Hook/UseMatomo'
import { useScriptsList } from 'App/Hook/UseScriptsList'
import { type FileScript } from 'App/Lib/Conf/ConfZod'
import { enterPageAnimate } from 'App/Lib/Framer'
import { isFileScriptInArray } from 'App/Lib/IsFileScriptInArray'
import { toast } from 'App/Lib/Toaster'
import { fromNullable } from 'App/Lib/TsResults'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Result } from 'ts-results'
import { useBoolean } from 'usehooks-ts'

function RecentScriptsDialog({
  currentScripts,
  onScriptsLoad,
  onClose,
  open = false,
  ...props
}: Omit<Dialog.DialogProps, 'onClose' | 'onKeyDown' | 'children' | 'className'> & {
  onClose: () => void
  currentScripts: FileScript[]
  onScriptsLoad: (scripts: FileScript[]) => void
}) {
  const { trackEvent } = useMatomo()
  const { t } = useTranslation()
  const recentScripts = useRecentScripts({
    refetchOnWindowFocus: false,
  })
  const updateRecentScripts = useUpdateRecentScripts()
  const { value: isMoreDetails, toggle: toggleMoreDetails, setValue: setMoreDetails } = useBoolean(false)
  const {
    scripts: scriptsToLoad,
    add: addScriptsToLoad,
    remove: removeScriptToLoad,
    clear: clearScriptsToLoad,
  } = useScriptsList({
    initialScripts: [] as FileScript[],
  })

  const effectiveClearScriptsToLoad = () => {
    void recentScripts.refetch()
    clearScriptsToLoad()
  }

  const handleOnClose = () => {
    onClose()
    effectiveClearScriptsToLoad()
  }

  const handleOnLoad = () => {
    onScriptsLoad(scriptsToLoad)
    effectiveClearScriptsToLoad()
    trackEvent({
      category: 'Recent Scripts',
      action: 'Load',
    })
  }

  const onDialogEnter = useKey('Enter', () => {
    if (is.emptyArray(scriptsToLoad)) return

    handleOnLoad()
  })

  const removeScriptFromRecentScripts = async (script: FileScript) => {
    if (recentScripts.data == null) return

    const res = (
      await Result.wrapAsync(async () => {
        await updateRecentScripts.mutateAsync({
          recentScripts: recentScripts.data.filter((s) => s.path !== script.path).map((s) => s.path),
          override: true,
        })
      })
    ).mapErr((reason) => new Error(t('common.removeRecentScriptsError', { error: reason })))

    if (res.err) {
      toast.error(res.val.message, { duration: 2000 })
    }
  }

  const closeButtonRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <Dialog.Root
        onClose={handleOnClose}
        onKeyDown={onDialogEnter}
        open={open}
        initialFocus={closeButtonRef}
        fullScreen
        {...props}
      >
        <Dialog.Title>
          <h2>{t('dialog.recentFiles.title')}</h2>
          <div className="mt-4 flex items-center">
            <Switch
              checked={isMoreDetails}
              onChange={setMoreDetails}
              label={t('dialog.recentFiles.actions.moreDetails')}
              name="more-details"
              disabled={fromNullable(recentScripts.data)
                .map((scripts) => is.emptyArray(scripts))
                .unwrapOr(false)}
            />
          </div>
        </Dialog.Title>
        <Dialog.Content>
          <AnimatePresence mode="wait" initial={false}>
            {/* eslint-disable react/jsx-key */}
            {fromNullable(recentScripts.data)
              .map((allScripts) => {
                if (is.emptyArray(allScripts)) {
                  return (
                    <motion.p className="flex grow items-center justify-center text-xl leading-6" {...enterPageAnimate}>
                      {t('dialog.recentFiles.noRecentFiles')}
                    </motion.p>
                  )
                }

                return (
                  <motion.div
                    transition={{ duration: 0.15, type: 'spring', stiffness: 500, damping: 30 }}
                    {...enterPageAnimate}
                    className="grow"
                  >
                    <ul className="group divide-y overflow-x-hidden border-y">
                      {allScripts.map((script) => {
                        const isAlreadyAddedInCurrentScripts = isFileScriptInArray(script, currentScripts)
                        const isAlreadyAddedInScriptsToLoad = scriptsToLoad.includes(script)

                        return (
                          <li
                            key={script.path}
                            className="group relative flex items-center aria-not-disabled:hover:bg-gray-50"
                            aria-disabled={isAlreadyAddedInCurrentScripts ? 'true' : undefined}
                          >
                            <label htmlFor={script.id} className="flex grow p-3 group-aria-disabled:opacity-50">
                              <div className="mr-3 mt-2 flex h-6 items-start">
                                <input
                                  id={script.id}
                                  aria-describedby={isMoreDetails ? `${script.id}-text` : undefined}
                                  name={script.id}
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 disabled:opacity-70"
                                  checked={isAlreadyAddedInScriptsToLoad}
                                  disabled={isAlreadyAddedInCurrentScripts}
                                  onChange={() => {
                                    if (isAlreadyAddedInScriptsToLoad) {
                                      removeScriptToLoad([script])
                                    } else {
                                      addScriptsToLoad([script])
                                    }
                                  }}
                                  tabIndex={1}
                                />
                              </div>
                              <div className="flex min-w-0 flex-1 flex-col justify-center text-sm leading-6">
                                <span className="font-medium text-gray-900">{script.name}</span>
                                {isMoreDetails ? (
                                  <p
                                    id={`${script.id}-text`}
                                    className="text-xs font-light leading-tight text-gray-500"
                                  >
                                    {script.path}
                                  </p>
                                ) : undefined}
                              </div>
                            </label>
                            <div className="pr-4">
                              <Button.Root
                                color="error"
                                variant="link"
                                onClick={async () => {
                                  await removeScriptFromRecentScripts(script)
                                  removeScriptToLoad([script])
                                }}
                                tabIndex={2}
                              >
                                <Button.Icon>
                                  <TrashIcon className="h-4 w-4 shrink-0" />
                                </Button.Icon>
                              </Button.Root>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </motion.div>
                )
              })
              .unwrapOr(null)}
          </AnimatePresence>
        </Dialog.Content>
        <Dialog.Actions>
          <div className="flex w-full justify-end gap-4">
            {fromNullable(recentScripts.data)
              .map((allScripts) => {
                const notInCurrentCompilationScripts = allScripts.filter(
                  (script) => !isFileScriptInArray(script, currentScripts),
                )
                const hasNoScripts = is.emptyArray(allScripts)
                const hasNoScriptsToLoad = is.emptyArray(scriptsToLoad)
                const hasNoMoreScriptsToLoad = notInCurrentCompilationScripts.length === scriptsToLoad.length

                return (
                  <RecentScriptsDialogActions
                    key="recent-scripts-dialog-actions"
                    className="mr-auto"
                    position="top-right"
                    onAll={() => {
                      addScriptsToLoad(notInCurrentCompilationScripts)
                    }}
                    onNone={clearScriptsToLoad}
                    onInvert={() => {
                      const toAdd = notInCurrentCompilationScripts.filter((script) => {
                        return !isFileScriptInArray(script, scriptsToLoad)
                      })
                      const toRemove = notInCurrentCompilationScripts.filter((script) => {
                        return isFileScriptInArray(script, scriptsToLoad)
                      })

                      addScriptsToLoad(toAdd)
                      removeScriptToLoad(toRemove)
                    }}
                    onClear={async () => {
                      await updateRecentScripts.mutateAsync({
                        recentScripts: [],
                        override: true,
                      })
                    }}
                    onDetails={toggleMoreDetails}
                    detailsText={t(isMoreDetails ? 'common.lessDetails' : 'common.moreDetails')}
                    scriptsToLoad={scriptsToLoad}
                    disabled={{
                      all:
                        hasNoMoreScriptsToLoad ||
                        hasNoScripts ||
                        is.emptyArray(notInCurrentCompilationScripts) ||
                        scriptsToLoad.length === allScripts.length,
                      none: hasNoScriptsToLoad,
                      clear: hasNoScripts,
                      load: hasNoScriptsToLoad,
                      details: hasNoScripts,
                      invert: is.emptyArray(notInCurrentCompilationScripts) || hasNoScripts,
                      button: hasNoScripts,
                    }}
                  />
                )
              })
              .unwrapOr(null)}
            <Button.Root onClick={handleOnClose} tabIndex={4} variant="secondary" ref={closeButtonRef}>
              {t('common.close')}
            </Button.Root>
            <Button.Root disabled={is.emptyArray(scriptsToLoad)} onClick={handleOnLoad} tabIndex={3}>
              {t('dialog.recentFiles.actions.load')}
            </Button.Root>
          </div>
        </Dialog.Actions>
      </Dialog.Root>
    </>
  )
}

export default RecentScriptsDialog
