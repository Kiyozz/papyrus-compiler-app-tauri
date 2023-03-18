/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import ClearIcon from '@mui/icons-material/Clear'
import HelpIcon from '@mui/icons-material/Help'
import HistoryIcon from '@mui/icons-material/History'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
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
import { enterPageAnimate } from 'App/Lib/Framer'
import { isQueryNonNullable } from 'App/Lib/IsQueryNonNullable'
import { pathsToFileScriptAndFilterPscFile } from 'App/Lib/PathsToFileScriptAndFilterPscFile'
import { toExecutable } from 'App/Lib/ToExecutable'
import { fromNullable } from 'App/Lib/TsResults'
import { AnimatePresence, motion } from 'framer-motion'
import { type RefObject, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { R } from 'App/Lib/FpTs'

const logs = createLogs('CompilationPage')

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
          logs.log('add scripts from recent scripts')()
          setRecentFilesDialogOpen(false)
        }}
      />

      <PageAppBar title={t('page.compilation.appBar.title')}>
        <Button
          onClick={() => {
            setRecentFilesDialogOpen(true)
          }}
          className="px-3 py-2"
          color="inherit"
          startIcon={<HistoryIcon />}
        >
          {t('common.recentFiles')}
        </Button>
        <TutorialTooltip title={t('common.settingsTutorial.compilation.addScripts')} step="compilation-add-scripts">
          <SearchScriptButton
            ref={refs['compilation-add-scripts'] as unknown as RefObject<HTMLButtonElement>}
            className="px-3 py-2"
            color="inherit"
            onFileSelect={(files, reason) => {
              const scriptsCompilation = fileScriptsToFileScriptCompilation(files)
              addScripts(scriptsCompilation)
              logs.log('add scripts from file select')()
              trackEvent({ category: 'Compilation', action: 'Add scripts', name: reason })
            }}
          >
            {t('common.searchScripts')}
          </SearchScriptButton>
        </TutorialTooltip>
        {isQueryNonNullable(groups) && R.size(groups.data) > 0 ? (
          <GroupChooseButton
            className="px-3 py-2"
            color="inherit"
            groups={groups.data}
            onGroupClick={(group) => {
              const paths = group.scripts.map((s) => s.path)
              const files = pathsToFileScriptAndFilterPscFile(paths)
              const scriptsCompilation = fileScriptsToFileScriptCompilation(files)
              addScripts(scriptsCompilation)
              logs.log('add scripts from group')()
              trackEvent({ category: 'Compilation', action: 'Add scripts', name: 'Group' })
            }}
          >
            {t('common.group')}
          </GroupChooseButton>
        ) : null}
      </PageAppBar>

      <Page className="flex flex-col">
        <div className="container mx-auto flex w-full grow flex-col">
          <AnimatePresence mode="wait">
            {scripts.length > 0 ? (
              <motion.div key="file-list">
                <div className="mb-4 flex gap-2">
                  <StartCompilationButton
                    onCompilationStart={async () => {
                      trackEvent({
                        category: 'Compilation',
                        action: 'Start',
                        name: 'All scripts',
                      })

                      logs.trace('start compilation for all remaining scripts')()

                      const scriptsToCompile = scripts.filter((script) => !isRunning(script) && !isBusy(script))

                      scriptsToCompile.forEach(removeCompilationLog)
                      await compile(scriptsToCompile)
                    }}
                    disabled={isAllScriptsRunningOrBusy || isCheckConfQueryError(checkConf)}
                  />

                  <Button
                    disabled={isAllScriptsRunningOrBusy}
                    onClick={() => {
                      clearScripts()
                      clearCompilationLogs()
                      logs.trace('clear scripts and compilation logs')()
                      trackEvent({
                        category: 'Compilation',
                        action: 'Clear',
                      })
                    }}
                    startIcon={<ClearIcon />}
                    color="inherit"
                  >
                    {t('common.clear')}
                  </Button>

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
                    logs.trace('remove script', scriptToRemove)()
                  }}
                  onStart={async (scriptToStart) => {
                    logs.trace('start compile single script', scriptToStart)()
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
                  <HelpIcon className="mt-3" />
                </Tooltip>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Page>

      <Snackbar open={isCheckConfQueryError(checkConf)} sx={{ zIndex: 30 }}>
        <Alert severity="error">
          {conf.isSuccess &&
            isCheckConfQueryError(checkConf) &&
            t<string>('common.confCheckError', {
              context: checkConf.data?.some ? checkConf.data.val.type : undefined,
              gameExe: toExecutable(conf.data.game.type),
            })}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CompilationPage
