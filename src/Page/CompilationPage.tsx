/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import CreateGroupFromScriptsButton from 'App/Component/Compilation/CreateGroupFromScriptsButton'
import FileScriptsList from 'App/Component/Compilation/FileScriptsList'
import StartCompilationButton from 'App/Component/Compilation/StartCompilationButton'
import RecentScriptsDialog from 'App/Component/Dialog/RecentScriptsDialog'
import GroupChooseButton from 'App/Component/GroupChooseButton'
import Page from 'App/Component/Page/Page'
import PageAppBar from 'App/Component/Page/PageAppBar'
import SearchScriptButton from 'App/Component/SearchScriptButton'
import TutorialTooltip from 'App/Component/Tutorial/Settings/TutorialTooltip'
import * as Alert from 'App/Component/UI/Alert'
import { useCompilationLogsStore } from 'App/Hook/CompilationLogs/UseCompilationLogsStore'
import { isCheckConfQueryError, useCheckConf } from 'App/Hook/Conf/UseCheckConf'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useGroups } from 'App/Hook/Group/UseGroups'
import { useCompilation } from 'App/Hook/UseCompilation'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useDialogsStore } from 'App/Hook/UseDialogsStore'
import { useMatomo } from 'App/Hook/UseMatomo'
import { createLogs } from 'App/Lib/CreateLog'
import { type FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilation'
import { isBusy, isRunning } from 'App/Lib/FileScriptCompilation'
import { fileScriptsToFileScriptCompilation } from 'App/Lib/FileScriptsToFileScriptCompilation'
import { enterPageAnimate, fadeScaleAnimate } from 'App/Lib/Framer'
import { isQueryNonNullable } from 'App/Lib/IsQueryNonNullable'
import { pathsToFileScriptAndFilterPscFile } from 'App/Lib/PathsToFileScriptAndFilterPscFile'
import { toExecutable } from 'App/Lib/ToExecutable'
import { fromNullable } from 'App/Lib/TsResults'
import { AnimatePresence, motion } from 'framer-motion'
import { type RefObject, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { R } from 'App/Lib/FpTs'
import * as Button from 'App/Component/UI/Button'
import { ClockIcon, DocumentArrowDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import * as EmptyState from 'App/Component/UI/EmptyState'

const logs = createLogs('CompilationPage')

function CompilationPage() {
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()
  const { setCompilationLogs: setCompilationLogsDialogOpen } = useDialogsStore()
  const { scripts, add: addScripts, clear: clearScripts, remove: removeScripts, compile } = useCompilation()
  const { remove: removeCompilationLog, clear: clearCompilationLogs } = useCompilationLogsStore()
  const [isRecentFilesDialogOpen, setRecentFilesDialogOpen] = useState(false)
  const groups = useGroups()
  const conf = useConf()
  const { refs } = useSettingsTutorial()
  const checkConf = useCheckConf(fromNullable(conf.data))

  const isAllScriptsRunningOrBusy = scripts.every((script) => isRunning(script) || isBusy(script))

  return (
    <div>
      <RecentScriptsDialog
        open={isRecentFilesDialogOpen}
        onClose={() => {
          setRecentFilesDialogOpen(false)
        }}
        currentScripts={scripts}
        onScriptsLoad={(paths) => {
          const files = pathsToFileScriptAndFilterPscFile(paths)
          const scriptsCompilation = fileScriptsToFileScriptCompilation(files)
          addScripts(scriptsCompilation)
          logs.log('add scripts from recent scripts')
          setRecentFilesDialogOpen(false)
        }}
      />

      <PageAppBar title={t('page.compilation.appBar.title')}>
        <div className="flex gap-x-2">
          <Button.Root
            variant="secondary"
            onClick={() => {
              setRecentFilesDialogOpen(true)
            }}
          >
            <Button.Icon edge="start">
              <ClockIcon />
            </Button.Icon>
            {t('common.recentFiles')}
          </Button.Root>
          {isQueryNonNullable(groups) && R.size(groups.data) > 0 ? (
            <GroupChooseButton
              variant="secondary"
              groups={groups.data}
              onGroupClick={(group) => {
                const paths = group.scripts.map((s) => s.path)
                const files = pathsToFileScriptAndFilterPscFile(paths)
                const scriptsCompilation = fileScriptsToFileScriptCompilation(files)
                addScripts(scriptsCompilation)
                logs.log('add scripts from group')
                trackEvent({ category: 'Compilation', action: 'Add scripts', name: 'Group' })
              }}
            >
              {t('common.group')}
            </GroupChooseButton>
          ) : null}
          <TutorialTooltip title={t('common.settingsTutorial.compilation.addScripts')} step="compilation-add-scripts">
            <SearchScriptButton
              ref={refs['compilation-add-scripts'] as unknown as RefObject<HTMLButtonElement>}
              onFileSelect={(files, reason) => {
                const scriptsCompilation = fileScriptsToFileScriptCompilation(files)
                addScripts(scriptsCompilation)
                logs.log('add scripts from file select')
                trackEvent({ category: 'Compilation', action: 'Add scripts', name: reason })
              }}
            >
              {t('common.searchScripts')}
            </SearchScriptButton>
          </TutorialTooltip>
        </div>
      </PageAppBar>

      <Page className="flex flex-col">
        <div className="container mx-auto flex w-full max-w-6xl grow flex-col">
          <AnimatePresence>
            {conf.isSuccess && isCheckConfQueryError(checkConf) && (
              <Alert.Root severity="error" asChild>
                <motion.div {...fadeScaleAnimate}>
                  <Alert.Content>
                    <Alert.Icon severity="error" className="py-4 pl-4" />
                    <Alert.Message severity="error" className="flex items-center divide-x">
                      <p className="grow py-4">
                        {/* @see https://github.com/i18next/react-i18next/issues/1541 */}
                        {t<any, any, any>('common.confCheckError', {
                          context: checkConf.data?.some ? checkConf.data.val.type : undefined,
                          gameExe: toExecutable(conf.data.game.type),
                        })}
                      </p>

                      <Link
                        to="/settings"
                        className="flex grow items-center justify-center self-stretch rounded-r-md p-4 ring-inset focus-visible:outline-none focus-visible:ring focus-visible:ring-inherit"
                      >
                        Configuration
                      </Link>
                    </Alert.Message>
                  </Alert.Content>
                </motion.div>
              </Alert.Root>
            )}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {scripts.length > 0 ? (
              <motion.div key="file-list" {...enterPageAnimate}>
                <div className="mb-4 flex gap-2">
                  <StartCompilationButton
                    onCompilationStart={async () => {
                      trackEvent({
                        category: 'Compilation',
                        action: 'Start',
                        name: 'All scripts',
                      })

                      logs.trace('start compilation for all remaining scripts')

                      const scriptsToCompile = scripts.filter((script) => !isRunning(script) && !isBusy(script))

                      scriptsToCompile.forEach(removeCompilationLog)
                      await compile(scriptsToCompile)
                    }}
                    disabled={isAllScriptsRunningOrBusy || isCheckConfQueryError(checkConf)}
                  />

                  <Button.Root
                    variant="secondary"
                    disabled={isAllScriptsRunningOrBusy}
                    onClick={() => {
                      clearScripts()
                      clearCompilationLogs()
                      logs.trace('clear scripts and compilation logs')
                      trackEvent({
                        category: 'Compilation',
                        action: 'Clear',
                      })
                    }}
                  >
                    <Button.Icon edge="start">
                      <XMarkIcon />
                    </Button.Icon>
                    {t('common.clearList')}
                  </Button.Root>

                  <TutorialTooltip
                    title={t('common.settingsTutorial.compilation.createGroupFromScriptsList')}
                    step="compilation-create-group-from-scripts-list"
                    side="left"
                    ref={refs['compilation-create-group-from-scripts-list']}
                  >
                    <CreateGroupFromScriptsButton className="ml-auto" scripts={scripts} />
                  </TutorialTooltip>
                </div>
                <FileScriptsList<FileScriptCompilation>
                  scripts={scripts}
                  onRemove={(scriptToRemove) => {
                    removeCompilationLog(scriptToRemove)
                    removeScripts([scriptToRemove])
                    logs.trace('remove script', scriptToRemove)
                  }}
                  onStart={async (scriptToStart) => {
                    logs.trace('start compile single script', scriptToStart)
                    removeCompilationLog(scriptToStart)
                    await compile([scriptToStart])

                    trackEvent({
                      category: 'Compilation',
                      action: 'Start',
                      name: 'Row',
                    })
                  }}
                  onClickOnError={() => {
                    setCompilationLogsDialogOpen(true)

                    trackEvent({
                      category: 'Compilation',
                      action: 'Show error',
                      name: 'Row',
                    })
                  }}
                  disabled={isCheckConfQueryError(checkConf)}
                />
              </motion.div>
            ) : (
              <EmptyState.Root asChild>
                <motion.div {...enterPageAnimate}>
                  <EmptyState.Icon>
                    <DocumentArrowDownIcon />
                  </EmptyState.Icon>
                  <EmptyState.Text className="flex flex-col space-y-4">
                    <span>{t('page.compilation.dragAndDropText')}</span>
                    <span className="font-normal">{t('page.compilation.dragAndDropAdmin')}</span>
                  </EmptyState.Text>
                </motion.div>
              </EmptyState.Root>
            )}
          </AnimatePresence>
        </div>
      </Page>
    </div>
  )
}

export default CompilationPage
