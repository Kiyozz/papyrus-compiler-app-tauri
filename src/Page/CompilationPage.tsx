/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import HelpIcon from '@mui/icons-material/Help'
import HistoryIcon from '@mui/icons-material/History'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import RecentFilesDialog from 'App/Component/Dialog/RecentFilesDialog'
import GroupChooseButton from 'App/Component/GroupChooseButton'
import Page from 'App/Component/Page/Page'
import PageAppBar from 'App/Component/Page/PageAppBar'
import SearchScriptButton from 'App/Component/SearchScriptButton'
import { useCompilation } from 'App/Hook/UseCompilation'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function CompilationPage() {
  const { t } = useTranslation()
  const {} = useCompilation()
  const [isRecentFilesDialogOpen, setRecentFilesDialogOpen] = useState(false)

  return (
    <div>
      <RecentFilesDialog
        open={isRecentFilesDialogOpen}
        onClose={() => setRecentFilesDialogOpen(false)}
        onSubmit={() => setRecentFilesDialogOpen(false)}
      />

      <PageAppBar title={t('page.compilation.appBar.title')}>
        <Button
          onClick={() => setRecentFilesDialogOpen(true)}
          className="px-3 py-2"
          color="inherit"
          startIcon={<HistoryIcon />}
        >
          {t('page.compilation.appBar.actions.recentFiles')}
        </Button>
        <SearchScriptButton className="px-3 py-2" color="inherit">
          {t('page.compilation.appBar.actions.searchScripts')}
        </SearchScriptButton>
        <GroupChooseButton className="px-3 py-2" color="inherit">
          {t('page.compilation.appBar.actions.group')}
        </GroupChooseButton>
      </PageAppBar>

      <Page className="flex flex-col">
        <div className="m-auto text-center">
          <Typography variant="h5">
            <span>{t('page.compilation.dragAndDropText')}</span>
          </Typography>
          <Tooltip title={t('page.compilation.dragAndDropAdmin')}>
            <HelpIcon className="mt-3" />
          </Tooltip>
        </div>
      </Page>
    </div>
  )
}

export default CompilationPage
