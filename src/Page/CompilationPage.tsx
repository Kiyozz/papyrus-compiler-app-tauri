/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
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
import { useCompilationLogs } from 'App/Hook/CompilationLogs/UseCompilationLogs'
import { isCheckConfQueryError, useCheckConf } from 'App/Hook/Conf/UseCheckConf'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useGroups } from 'App/Hook/Group/UseGroups'
import { useCompilation } from 'App/Hook/UseCompilation'
import { useDialogs } from 'App/Hook/UseDialogs'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
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
import { ClockIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const logs = createLogs('CompilationPage')
const MotionAlertContent = motion(Alert.Content)

function CompilationPage() {
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()
  const {
    compilationLogs: [, setCompilationLogsDialogOpen],
  } = useDialogs()
  const { scripts, add: addScripts, clear: clearScripts, remove: removeScripts, compile } = useCompilation()
  const { remove: removeCompilationLog, clear: clearCompilationLogs } = useCompilationLogs()
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
            color="inherit"
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
              className="px-3 py-2"
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
              <MotionAlertContent severity="error" className="flex" {...fadeScaleAnimate}>
                <Alert.Icon severity="error" className="py-4 pl-4" />
                <Alert.Message severity="error" className="flex items-center divide-x">
                  <p className="py-4">
                    {t<string>('common.confCheckError', {
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
              </MotionAlertContent>
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
                    placement="left-start"
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
              <motion.div className="m-auto text-center" key="page-description" {...enterPageAnimate}>
                <Typography variant="h5">
                  <span>{t('page.compilation.dragAndDropText')}</span>
                </Typography>
                <Tooltip title={t('page.compilation.dragAndDropAdmin')}>
                  <QuestionMarkCircleIcon className="mt-3 inline-block h-8 w-8" />
                </Tooltip>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Page>
    </div>
  )
}

export default CompilationPage
