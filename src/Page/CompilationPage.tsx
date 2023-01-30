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
import { useCompilationLogs } from 'App/Hook/CompilationLogs/UseCompilationLogs'
import { isCheckConfQueryError, useCheckConf } from 'App/Hook/Conf/UseCheckConf'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useGroups } from 'App/Hook/Group/UseGroups'
import { useCompilation } from 'App/Hook/UseCompilation'
import { useDialogs } from 'App/Hook/UseDialogs'
import { FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'
import { isRunning } from 'App/Lib/FileScriptCompilation'
import { fileScriptsToFileScriptCompilation } from 'App/Lib/FileScriptsToFileScriptCompilation'
import { A, flow, O, pipe, R } from 'App/Lib/FpTs'
import { isQueryNonNullable } from 'App/Lib/IsQueryNonNullable'
import { pathsToFileScript } from 'App/Lib/PathsToFileScript'
import { toExecutable } from 'App/Lib/ToExecutable'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function CompilationPage() {
  const { t } = useTranslation()
  const {
    compilationLogs: [, setCompilationLogsDialogOpen],
  } = useDialogs()
  const { scripts, add: addScripts, clear: clearScripts, remove: removeScripts, compile } = useCompilation()
  const { remove: removeLog, clear: clearLogs } = useCompilationLogs()
  const [isRecentFilesDialogOpen, setRecentFilesDialogOpen] = useState(false)
  const groups = useGroups()
  const conf = useConf()
  const checkConf = useCheckConf(O.fromNullable(conf.data))

  const isAllScriptsRunning = scripts.every(isRunning)

  return (
    <div>
      <RecentScriptsDialog
        open={isRecentFilesDialogOpen}
        onClose={() => setRecentFilesDialogOpen(false)}
        currentScripts={scripts}
        onScriptsLoad={flow(pathsToFileScript, fileScriptsToFileScriptCompilation, addScripts, () =>
          setRecentFilesDialogOpen(false),
        )}
      />

      <PageAppBar title={t('page.compilation.appBar.title')}>
        <Button
          onClick={() => setRecentFilesDialogOpen(true)}
          className="px-3 py-2"
          color="inherit"
          startIcon={<HistoryIcon />}
        >
          {t('common.recentFiles')}
        </Button>
        <SearchScriptButton
          className="px-3 py-2"
          color="inherit"
          onFileSelect={flow(fileScriptsToFileScriptCompilation, addScripts)}
        >
          {t('common.searchScripts')}
        </SearchScriptButton>
        {isQueryNonNullable(groups) && R.size(groups.data) > 0 ? (
          <GroupChooseButton
            className="px-3 py-2"
            color="inherit"
            groups={groups.data}
            onGroupClick={flow(
              (group) => group.scripts.map((script) => script.path),
              pathsToFileScript,
              fileScriptsToFileScriptCompilation,
              addScripts,
            )}
          >
            {t('common.group')}
          </GroupChooseButton>
        ) : null}
      </PageAppBar>

      <Page className="flex flex-col">
        {scripts.length > 0 ? (
          <>
            <div className="mb-4 flex gap-2">
              <StartCompilationButton
                onCompilationStart={async () => {
                  await pipe(
                    scripts,
                    A.filter((script) => script.status !== 'running'),
                    (scripts) => {
                      scripts.forEach(removeLog)

                      return compile(scripts)
                    },
                  )
                }}
                disabled={isAllScriptsRunning || isCheckConfQueryError(checkConf)}
              />

              <Button
                disabled={isAllScriptsRunning}
                onClick={flow(clearScripts, clearLogs)}
                startIcon={<ClearIcon />}
                color="inherit"
              >
                {t('common.clear')}
              </Button>

              <CreateGroupFromScriptsButton className="ml-auto" scripts={scripts} />
            </div>
            <FileScriptsList<FileScriptCompilation>
              scripts={scripts}
              onRemove={(scriptToRemove) => {
                removeLog(scriptToRemove)
                removeScripts([scriptToRemove])
              }}
              onStart={async (scriptToStart) => {
                removeLog(scriptToStart)
                await compile([scriptToStart])
              }}
              onClickOnError={() => {
                setCompilationLogsDialogOpen(true)
              }}
              disabled={isCheckConfQueryError(checkConf)}
            />
          </>
        ) : (
          <div className="m-auto text-center">
            <Typography variant="h5">
              <span>{t('page.compilation.dragAndDropText')}</span>
            </Typography>
            <Tooltip title={t('page.compilation.dragAndDropAdmin')}>
              <HelpIcon className="mt-3" />
            </Tooltip>
          </div>
        )}
      </Page>

      <Snackbar open={isCheckConfQueryError(checkConf)} sx={{ zIndex: 30 }}>
        <Alert severity="error">
          {conf.isSuccess &&
            isCheckConfQueryError(checkConf) &&
            t<string>('common.confCheckError', {
              context: checkConf.data.value.type,
              gameExe: toExecutable(conf.data.game.type),
            })}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default CompilationPage
