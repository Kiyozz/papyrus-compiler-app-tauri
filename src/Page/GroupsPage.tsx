import CreateIcon from '@mui/icons-material/Create'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import GroupDialog from 'App/Component/Dialog/GroupDialog'
import Page from 'App/Component/Page'
import PageAppBar from 'App/Component/PageAppBar'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function GroupsPage() {
  const { t } = useTranslation()
  const [isGroupDialogOpen, setGroupDialogOpen] = useState(false)

  return (
    <>
      <GroupDialog
        open={isGroupDialogOpen}
        onClose={() => setGroupDialogOpen(false)}
        onSubmit={() => setGroupDialogOpen(false)}
      />

      <PageAppBar title="Groups">
        <Button
          className="px-3 py-2"
          color="inherit"
          startIcon={<CreateIcon />}
          onClick={() => setGroupDialogOpen(true)}
        >
          {t('page.groups.appBar.actions.create')}
        </Button>
      </PageAppBar>

      <Page>
        <div className="h-full w-full justify-center gap-4 text-lg">
          <Typography gutterBottom variant="h6">
            {t('page.groups.createGroupText')}
          </Typography>
          <Typography variant="body2">{t('page.groups.whatIsAGroup')}</Typography>
        </div>
      </Page>
    </>
  )
}

export default GroupsPage
