/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Menu, { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import { flow } from 'App/Lib/FpTs'
import { useTranslation } from 'react-i18next'

export const MenuSelectList = ({
  onAll,
  onNone,
  onInvert,
  children,
  disabled = {},
  ...props
}: Omit<MenuProps, 'anchorPosition' | 'anchorEl' | 'onClose' | 'anchorReference' | 'onLoad'> & {
  anchorPosition: MenuProps['anchorPosition']
  onClose: () => void
  onAll: () => void
  onNone: () => void
  onInvert: () => void
  disabled?: {
    all?: boolean
    none?: boolean
    invert?: boolean
  }
}) => {
  const { t } = useTranslation()

  return (
    <Menu {...props} anchorReference="anchorPosition">
      <MenuItem onClick={flow(props.onClose, onAll)} disabled={disabled.all}>
        {t('common.select.all')}
      </MenuItem>
      <MenuItem onClick={flow(props.onClose, onNone)} disabled={disabled.none}>
        {t('common.select.none')}
      </MenuItem>
      <MenuItem onClick={flow(props.onClose, onInvert)} disabled={disabled.invert}>
        {t('common.select.invert')}
      </MenuItem>
      {children && <Divider />}
      {children}
    </Menu>
  )
}
