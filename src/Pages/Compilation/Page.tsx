import HelpIcon from '@mui/icons-material/Help'
import HistoryIcon from '@mui/icons-material/History'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import GroupChooseButton from 'App/Components/GroupChooseButton'
import Page from 'App/Components/Page'
import PageAppBar from 'App/Components/PageAppBar'
import SearchScriptButton from 'App/Components/SearchScriptButton'
import { useCompilation } from 'App/Hooks/UseCompilation'

function Compilation() {
  const {} = useCompilation()

  return (
    <div>
      <PageAppBar title="Compilation">
        <Button className="px-3 py-2" color="inherit" startIcon={<HistoryIcon />}>
          Recent files
        </Button>
        <SearchScriptButton className="px-3 py-2" color="inherit" />
        <GroupChooseButton className="px-3 py-2" color="inherit" />
      </PageAppBar>

      <div className="container mx-auto">
        <Page>
          <div className="m-auto text-center">
            <Typography variant="h5">
              <span>{'page.compilation.dragAndDropText'}</span>
            </Typography>
            <Tooltip title={'page.compilation.dragAndDropAdmin'}>
              <HelpIcon className="mt-3" />
            </Tooltip>
          </div>
        </Page>
      </div>
    </div>
  )
}

export default Compilation
