/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import ClearIcon from '@mui/icons-material/Clear'
import HelpIcon from '@mui/icons-material/Help'
import HistoryIcon from '@mui/icons-material/History'
import PlayIcon from '@mui/icons-material/PlayCircleFilled'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import FileScriptsList from 'App/Component/Compilation/FileScriptsList'
import RecentScriptsDialog from 'App/Component/Dialog/RecentScriptsDialog'
import GroupChooseButton from 'App/Component/GroupChooseButton'
import Page from 'App/Component/Page/Page'
import PageAppBar from 'App/Component/Page/PageAppBar'
import SearchScriptButton from 'App/Component/SearchScriptButton'
import { useGroups } from 'App/Hook/Group/UseGroups'
import { useCompilation } from 'App/Hook/UseCompilation'
import { FileScriptCompilation } from 'App/Lib/Compilation/FileScriptCompilationDecoder'
import { flow } from 'App/Lib/FpTs'
import { isQueryNonNullable } from 'App/Lib/IsQueryNonNullable'
import { pathsToFileScriptCompilation } from 'App/Lib/PathsToFileScriptCompilation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function CompilationPage() {
  const { t } = useTranslation()
  const { scripts, add: addScripts, clear: clearScripts, remove: removeScripts, running } = useCompilation()
  const [isRecentFilesDialogOpen, setRecentFilesDialogOpen] = useState(false)
  const groups = useGroups()

  return (
    <div>
      <RecentScriptsDialog
        open={isRecentFilesDialogOpen}
        onClose={() => setRecentFilesDialogOpen(false)}
        onSubmit={() => setRecentFilesDialogOpen(false)}
        currentScripts={scripts}
        onClickLoad={flow(pathsToFileScriptCompilation, addScripts, () => setRecentFilesDialogOpen(false))}
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
        <SearchScriptButton className="px-3 py-2" color="inherit" onFileSelect={addScripts}>
          {t('common.searchScripts')}
        </SearchScriptButton>
        {isQueryNonNullable(groups) && Object.keys(groups.data).length > 0 ? (
          <GroupChooseButton
            className="px-3 py-2"
            color="inherit"
            groups={groups.data}
            onGroupClick={flow(
              (group) => group.scripts.map((script) => script.path),
              pathsToFileScriptCompilation,
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
              <Button
                color="primary"
                disabled={/*Boolean(configError) || */ running}
                onClick={() => {
                  console.log('start compilation')
                }}
                startIcon={<PlayIcon />}
                variant="contained"
              >
                {t('common.start')}
              </Button>

              <Button disabled={running} onClick={clearScripts} startIcon={<ClearIcon />} color="inherit">
                {t('common.clear')}
              </Button>
            </div>
            <FileScriptsList<FileScriptCompilation>
              scripts={scripts}
              onRemove={(scriptToRemove) => {
                removeScripts([scriptToRemove])
              }}
              onStart={(scriptToStart) => {
                console.log('start compilation', scriptToStart)
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
