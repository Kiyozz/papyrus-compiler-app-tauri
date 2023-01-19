/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import ClearIcon from '@mui/icons-material/Clear'
import HelpIcon from '@mui/icons-material/Help'
import HistoryIcon from '@mui/icons-material/History'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import FileScriptsList from 'App/Component/Compilation/FileScriptsList'
import StartCompilationButton from 'App/Component/Compilation/StartCompilationButton'
import RecentScriptsDialog from 'App/Component/Dialog/RecentScriptsDialog'
import GroupChooseButton from 'App/Component/GroupChooseButton'
import Page from 'App/Component/Page/Page'
import PageAppBar from 'App/Component/Page/PageAppBar'
import SearchScriptButton from 'App/Component/SearchScriptButton'
import { isCheckConfQueryError, useCheckConf } from 'App/Hook/Conf/UseCheckConf'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useGroups } from 'App/Hook/Group/UseGroups'
import { useCompilation } from 'App/Hook/UseCompilation'
import { FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'
import { fileScriptsToFileScriptCompilation } from 'App/Lib/FileScriptsToFileScriptCompilation'
import { A, flow, O, pipe, R } from 'App/Lib/FpTs'
import { isQueryNonNullable } from 'App/Lib/IsQueryNonNullable'
import { pathsToFileScript } from 'App/Lib/PathsToFileScript'
import { toExecutable } from 'App/Util/ToExecutable'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function CompilationPage() {
  const { t } = useTranslation()
  const { scripts, add: addScripts, clear: clearScripts, remove: removeScripts, compile } = useCompilation()
  const [isRecentFilesDialogOpen, setRecentFilesDialogOpen] = useState(false)
  const groups = useGroups()
  const conf = useConf()
  const checkConf = useCheckConf(O.fromNullable(conf.data))

  const isAllScriptsRunning = scripts.every((script) => script.status === 'running')

  return (
    <div>
      {conf.isSuccess && isCheckConfQueryError(checkConf) && (
        <div>
          {t('common.confCheckError', {
            context: checkConf.data.value.type,
            gameExe: toExecutable(conf.data.game.type),
          })}
        </div>
      )}

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
                onCompilationStart={() => {
                  pipe(
                    scripts,
                    A.filter((script) => script.status !== 'running'),
                    compile,
                  )
                }}
                disabled={isAllScriptsRunning}
              />

              <Button disabled={isAllScriptsRunning} onClick={clearScripts} startIcon={<ClearIcon />} color="inherit">
                {t('common.clear')}
              </Button>
            </div>
            <FileScriptsList<FileScriptCompilation>
              scripts={scripts}
              onRemove={(scriptToRemove) => {
                removeScripts([scriptToRemove])
              }}
              onStart={async (scriptToStart) => {
                console.log('start compilation', scriptToStart)
                await compile([scriptToStart])
              }}
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
    </div>
  )
}

export default CompilationPage
