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
import { None, type Option, Some } from 'ts-results'
import { motion } from 'framer-motion'

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
  const [anchor, setAnchor] = useState<Option<HTMLElement>>(None)

  const onOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchor(Some(e.currentTarget))
  }

  const handleClickEdit = () => {
    setAnchor(None)
    onClickEdit()
  }

  const onClickRemove = () => {
    setAnchor(None)
    onTryRemove()
  }

  return (
    <motion.div className={cx('relative', className)} layout>
      <IconButton
        aria-controls={anchor.some ? `${groupId}-group-button-menu` : undefined}
        aria-expanded={anchor.some ? 'true' : undefined}
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
        anchorEl={anchor.unwrapOr(null)}
        id={`${groupId}-group-button-menu`}
        onClose={() => {
          setAnchor(None)
        }}
        open={anchor.some}
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
    </motion.div>
  )
}

export default GroupsListItemSecondaryAction
