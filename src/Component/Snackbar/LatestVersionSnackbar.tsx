/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import CloseIcon from '@mui/icons-material/Close'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import ChangelogDialog from 'App/Component/Dialog/ChangelogDialog'
import { useLatestVersion } from 'App/Hook/UseLatestVersion'
import { useListenCheckForUpdates } from 'App/Hook/UseListenCheckForUpdates'
import { useVersion } from 'App/Hook/UseVersion'
import { isNewerVersion } from 'App/Util/IsNewerVersion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const LatestVersionSnackbar = () => {
  const { t } = useTranslation()
  const [manualUpdateCheck, setManualUpdateCheck] = useState(false)
  const latestVersion = useLatestVersion({
    retry: 1,
    onSuccess: (data) => {
      if (!version.data) return

      setSnackOpen(!isNewerVersion(version.data, data.data.tag_name) || manualUpdateCheck)
    },
  })
  const [snackOpen, setSnackOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const version = useVersion()
  const isLatestVersion =
    latestVersion.isSuccess && version.isSuccess
      ? isNewerVersion(version.data, latestVersion.data.data.tag_name)
      : false

  useListenCheckForUpdates({
    onCheckForUpdates: () => {
      setManualUpdateCheck(true)
      latestVersion.refetch()
    },
  })

  return (
    <>
      <ChangelogDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        markdownNotes={latestVersion.data?.data.body ?? ''}
        version={latestVersion.data?.data.tag_name ?? ''}
      />
      <Snackbar
        open={(latestVersion.isFetching && manualUpdateCheck) || snackOpen}
        onClose={() => {
          setManualUpdateCheck(false)
          setSnackOpen(false)
        }}
        className="z-20"
      >
        <Alert
          severity={isLatestVersion ? 'success' : 'info'}
          action={
            <>
              {!isLatestVersion && (
                <Button
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setDialogOpen(true)
                    setSnackOpen(false)
                  }}
                  className="h-full"
                >
                  Notes de mise à jour
                </Button>
              )}
              <IconButton color="inherit" size="small" onClick={() => setSnackOpen(false)}>
                <CloseIcon />
              </IconButton>
            </>
          }
        >
          {isLatestVersion
            ? t('common.youAreUsingLatestVersion')
            : t('common.newVersionAvailable', {
                version: latestVersion.data?.data.tag_name ?? 'unknown',
              })}
        </Alert>
      </Snackbar>
    </>
  )
}

export default LatestVersionSnackbar
