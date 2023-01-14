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
import { A, flow, O, pipe } from 'App/Lib/FpTs'
import { GroupWithId } from 'App/Type/GroupWithId'
import cx from 'classnames'
import { useTranslation } from 'react-i18next'

function GroupsList({
  groups,
  onTryRemove,
  onClickEdit,
  isMoreDetails,
  className,
}: {
  groups: GroupWithId[]
  onTryRemove: (group: GroupWithId) => void
  onClickEdit: (group: GroupWithId) => void
  isMoreDetails: boolean
  className?: string
}) {
  const { t } = useTranslation()

  return (
    <List className={cx('flex flex-col gap-2', className)}>
      {groups.map((group) => {
        const secondaryText = pipe(
          !isMoreDetails ? O.none : O.some(group.scripts),
          O.map(
            A.match(
              () => (isMoreDetails ? t('common.noScripts') : undefined),
              flow(
                A.map((s) => s.name),
                (scripts) => scripts.join(', '),
              ),
            ),
          ),
          O.toUndefined,
        )

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
            <ListItemText aria-label={group.name} primary={group.name} secondary={secondaryText} />
          </ListItem>
        )
      })}
    </List>
  )
}

export default GroupsList
