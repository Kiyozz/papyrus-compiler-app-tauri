/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import GroupsListItemSecondaryAction from 'App/Component/Groups/GroupsListItemSecondaryAction'
import { GroupWithId } from 'App/Type/GroupWithId'
import cx from 'classnames'

function GroupsList({
  groups,
  onTryRemove,
  onClickEdit,
  className,
}: {
  groups: GroupWithId[]
  onTryRemove: (group: GroupWithId) => void
  onClickEdit: (group: GroupWithId) => void
  className?: string
}) {
  return (
    <List className={cx('flex flex-col gap-2', className)}>
      {groups.map((group) => {
        return (
          <ListItem
            className="py-4"
            key={group.id}
            component={Paper}
            secondaryAction={
              <GroupsListItemSecondaryAction
                groupId={group.id}
                onTryRemove={() => onTryRemove(group)}
                onClickEdit={() => onClickEdit(group)}
              />
            }
            variant="outlined"
          >
            <ListItemText aria-label={group.name} primary={group.name} />
          </ListItem>
        )
      })}
    </List>
  )
}

export default GroupsList
