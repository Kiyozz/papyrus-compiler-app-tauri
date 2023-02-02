/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import OpenInBrowser from '@mui/icons-material/OpenInNew'
import DownloadIcon from '@mui/icons-material/Download'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Code from 'App/Component/Markdown/Code'
import Li from 'App/Component/Markdown/Li'
import P from 'App/Component/Markdown/P'
import Ul from 'App/Component/Markdown/Ul'
import H1 from 'App/Component/Markdown/H1'
import H2 from 'App/Component/Markdown/H2'
import H3 from 'App/Component/Markdown/H3'
import H5 from 'App/Component/Markdown/H5'
import useDocumentationUrl from 'App/Hook/UseDocumentationUrl'
import { useTranslation, Trans } from 'react-i18next'
import Markdown from 'react-markdown'
import A from '../Markdown/A'
import Img from '../Markdown/Img'
import { open as openExternal } from '@tauri-apps/api/shell'

const ChangelogDialog = ({
  open,
  onClose,
  markdownNotes,
  version,
}: {
  open: boolean
  onClose: () => void
  markdownNotes: string
  version: string
}) => {
  const documentationUrl = useDocumentationUrl()
  const { t } = useTranslation()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-describedby="dialog-changelogs-content"
      aria-labelledby="dialog-changelogs-title"
      fullScreen
    >
      <DialogTitle id="dialog-changelogs-title">
        <Trans i18nKey="common.changelogs" values={{ version }}>
          <strong />
        </Trans>
        <Tooltip title={t('common.openInBrowser')} enterDelay={0}>
          <IconButton
            size="small"
            className="ml-2"
            disabled={!documentationUrl.data}
            aria-label={t('common.openInBrowser')}
            onClick={() => {
              if (!documentationUrl.data) return

              void openExternal(`${documentationUrl.data}/changelogs/${version.replace('v', '')}`)
            }}
          >
            <OpenInBrowser />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent dividers id="dialog-changelogs-content">
        <Markdown
          components={{
            p: P,
            h1: H1,
            h2: H2,
            h3: H3,
            h5: H5,
            code: Code,
            a: A,
            img: Img,
            ul: Ul,
            li: Li,
          }}
        >
          {markdownNotes}
        </Markdown>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {t('common.close')}
        </Button>
        <Button
          onClick={() => {
            // TODO: Download update
          }}
          color="inherit"
          startIcon={<DownloadIcon />}
        >
          {t('common.download')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ChangelogDialog
