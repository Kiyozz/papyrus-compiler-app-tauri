import HelpIcon from '@mui/icons-material/Help'
import RefreshIcon from '@mui/icons-material/Refresh'
import Button from '@mui/material/Button'
import Page from 'App/Components/Page'
import PageAppBar from 'App/Components/PageAppBar'

function Settings() {
  return (
    <div>
      <PageAppBar title="Settings">
        <Button className="px-3 py-2" color="inherit" startIcon={<HelpIcon />}>
          Documentation
        </Button>
        <Button className="px-3 py-2" color="inherit" startIcon={<RefreshIcon />}>
          Refresh
        </Button>
      </PageAppBar>

      <Page>
        <div className="container mx-auto">
          <Button variant="contained">Settings</Button>
        </div>
      </Page>
    </div>
  )
}

export default Settings
