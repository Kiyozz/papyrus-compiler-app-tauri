/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import is from '@sindresorhus/is'
import GroupsListItemSecondaryAction from 'App/Component/Groups/GroupsListItemSecondaryAction'
import { type GroupWithId } from 'App/Type/GroupWithId'
import { useTranslation } from 'react-i18next'
import { None, Some } from 'ts-results'
import * as List from 'App/Component/UI/List'

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
    <List.Root className={className}>
      {groups.map((group) => {
        const secondaryText = (!isMoreDetails ? None : Some(group.scripts)).andThen((scripts) => {
          if (is.emptyArray(scripts)) {
            return isMoreDetails ? Some(t('common.noScripts')) : None
          }

          return Some(scripts.map((s) => s.name).join(', '))
        })

        return (
          <List.Item key={group.id} className="flex items-center justify-between">
            <div>
              <p className="grow leading-6">{group.name}</p>
              {secondaryText.some && <p className="text-xs leading-4 text-gray-600">{secondaryText.val}</p>}
            </div>
            <GroupsListItemSecondaryAction
              groupId={group.id}
              onTryRemove={() => {
                onTryRemove(group)
              }}
              onClickEdit={() => {
                onClickEdit(group)
              }}
            />
          </List.Item>
        )
      })}
    </List.Root>
  )
}

export default GroupsList
