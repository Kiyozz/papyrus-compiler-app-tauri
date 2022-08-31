import HelpIcon from '@mui/icons-material/Help'
import RefreshIcon from '@mui/icons-material/Refresh'
import Button from '@mui/material/Button'
import Page from 'App/Component/Page'
import PageAppBar from 'App/Component/PageAppBar'
import { useTranslation } from 'react-i18next'

function SettingsPage() {
  const { t } = useTranslation()

  return (
    <div>
      <PageAppBar title="Settings">
        <Button className="px-3 py-2" color="inherit" startIcon={<HelpIcon />}>
          {t('page.settings.appBar.actions.documentation')}
        </Button>
        <Button className="px-3 py-2" color="inherit" startIcon={<RefreshIcon />}>
          {t('page.settings.appBar.actions.refresh')}
        </Button>
      </PageAppBar>

      <Page>
        <Button variant="contained">Settings</Button>
      </Page>
    </div>
  )
}

export default SettingsPage
