/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import ChangelogDialog from 'App/Component/Dialog/ChangelogDialog'
import { useLatestVersion } from 'App/Hook/UseLatestVersion'
import { useListenCheckForUpdates } from 'App/Hook/UseListenCheckForUpdates'
import { useVersion } from 'App/Hook/UseVersion'
import { toast, toastManager } from 'App/Lib/Toaster'
import { isNewerVersion } from 'App/Util/IsNewerVersion'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import * as Button from 'App/Component/UI/Button'

const LatestVersionManager = () => {
  const { t } = useTranslation()
  const manualCheck = useRef(false)
  const latestVersion = useLatestVersion({
    retry: 1,
  })
  const [dialogOpen, setDialogOpen] = useState(false)
  const version = useVersion()
  const isLatestVersion =
    latestVersion.isSuccess && version.isSuccess
      ? isNewerVersion(version.data, latestVersion.data.data.tag_name)
      : false

  useEffect(() => {
    let toastId: string | undefined
    if (version.isSuccess && latestVersion.isSuccess) {
      if (isLatestVersion) {
        if (manualCheck.current) {
          toastId = toast.success(t('common.youAreUsingLatestVersion'))
        }
      } else {
        toastId = toast.info(
          <div className="flex items-center space-x-4">
            <p>{t('common.newVersionAvailable', { version: latestVersion.data?.data.tag_name ?? 'unknown' })}</p>
            <Button.Root
              onClick={() => {
                if (toastId != null) {
                  toastManager.remove(toastId)
                }

                setDialogOpen(true)
              }}
            >
              {t('common.seeChangelogs')}
            </Button.Root>
          </div>,
          {
            duration: Infinity,
          },
        )
      }
    }

    return () => {
      if (toastId != null) {
        toastManager.remove(toastId)
      }
    }
  }, [version.data, version.isSuccess, latestVersion.data, latestVersion.isSuccess, isLatestVersion, t])

  useListenCheckForUpdates(() => {
    manualCheck.current = true
    void latestVersion.refetch()
  })

  return (
    <ChangelogDialog
      open={dialogOpen}
      onClose={() => {
        setDialogOpen(false)
      }}
      markdownNotes={latestVersion.data?.data.body ?? ''}
      version={latestVersion.data?.data.tag_name ?? ''}
    />
  )
}

export default LatestVersionManager
