import CreateIcon from '@mui/icons-material/Create'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Page from 'App/Components/Page'
import PageAppBar from 'App/Components/PageAppBar'

function Groups() {
  return (
    <div>
      <PageAppBar title="Groups">
        <Button className="px-3 py-2" color="inherit" startIcon={<CreateIcon />}>
          Create
        </Button>
      </PageAppBar>

      <div className="container mx-auto">
        <Page>
          <div className="h-full w-full justify-center gap-4 text-lg">
            <Typography gutterBottom variant="h6">
              {'page.groups.createGroupText'}
            </Typography>
            <Typography variant="body2">{'page.groups.whatIsAGroup'}</Typography>
          </div>
        </Page>
      </div>
    </div>
  )
}

export default Groups
