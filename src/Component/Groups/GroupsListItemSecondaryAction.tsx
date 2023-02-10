/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import cx from 'classnames'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { useTranslation } from 'react-i18next'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { O } from 'App/Lib/FpTs'

const GroupsListItemSecondaryAction = ({
  groupId,
  className,
  onTryRemove,
  onClickEdit,
}: {
  groupId: string
  className?: string
  onTryRemove: () => void
  onClickEdit: () => void
}) => {
  const { t } = useTranslation()
  const [anchor, setAnchor] = useState<O.Option<HTMLElement>>(O.none)

  const onOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchor(O.some(e.currentTarget))
  }

  const handleClickEdit = () => {
    setAnchor(O.none)
    onClickEdit()
  }

  const onClickRemove = () => {
    setAnchor(O.none)
    onTryRemove()
  }

  return (
    <div className={cx('relative', className)}>
      <IconButton
        aria-controls={anchor ? `${groupId}-group-button-menu` : undefined}
        aria-expanded={anchor ? 'true' : undefined}
        aria-haspopup="true"
        id={`${groupId}-group-opener`}
        onClick={onOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        MenuListProps={{
          'aria-labelledby': `${groupId}-group-opener`,
        }}
        anchorEl={O.toNullable(anchor)}
        id={`${groupId}-group-button-menu`}
        onClose={() => setAnchor(O.none)}
        open={O.isSome(anchor)}
      >
        <MenuItem aria-label={t('common.edit')} onClick={handleClickEdit}>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary={t('common.edit')} />
        </MenuItem>
        <MenuItem aria-label={t('common.remove')} onClick={onClickRemove}>
          <ListItemIcon>
            <DeleteIcon color="error" />
          </ListItemIcon>
          <ListItemText primary={t('common.remove')} />
        </MenuItem>
      </Menu>
    </div>
  )
}

export default GroupsListItemSecondaryAction
