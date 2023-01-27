/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { MenuSelectList } from 'App/Component/MenuSelectList'
import { FileScript } from 'App/Lib/Conf/ConfDecoder'
import { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

const RecentScriptsDialogContextMenu = ({
  onClear,
  onDetails,
  onLoad,
  detailsText,
  scriptsToLoad,
  disabled = {},
  ...props
}: ComponentProps<typeof MenuSelectList> & {
  onClear: () => void
  onDetails: () => void
  onLoad: () => void
  detailsText: string
  scriptsToLoad: FileScript[]
  disabled?: {
    clear?: boolean
    details?: boolean
    load?: boolean
  }
}) => {
  const { t } = useTranslation()

  return (
    <MenuSelectList
      {...props}
      disabled={{
        all: disabled.all,
        none: disabled.none,
        invert: disabled.invert,
      }}
      onClose={props.onClose}
    >
      <MenuItem onClick={onDetails} disabled={disabled.details}>
        {detailsText}
      </MenuItem>
      <MenuItem disabled={disabled.load} onClick={onLoad}>
        {t('dialog.recentFiles.actions.load')}
      </MenuItem>
      <Divider />
      <MenuItem onClick={onClear} disabled={disabled.clear}>
        {t('common.clear')}
      </MenuItem>
    </MenuSelectList>
  )
}

export default RecentScriptsDialogContextMenu
