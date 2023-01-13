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

// TODO: group menu remove/edit

const GroupsListItemSecondaryAction = ({
  groupId,
  className,
  onTryRemove,
  onEdit,
}: {
  groupId: string
  className?: string
  onTryRemove: () => void
  onEdit: () => void
}) => {
  const { t } = useTranslation()
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)

  const onOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchor(e.currentTarget)
  }

  const onClickEdit = () => {
    setAnchor(null)
    onEdit()
  }

  const onClickRemove = () => {
    setAnchor(null)
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
        anchorEl={anchor}
        id={`${groupId}-group-button-menu`}
        open={Boolean(anchor)}
      >
        <MenuItem aria-label={t<string>('common.edit')} onClick={onClickEdit}>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary={t('common.edit')} />
        </MenuItem>
        <MenuItem aria-label={t<string>('common.remove')} onClick={onClickRemove}>
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
