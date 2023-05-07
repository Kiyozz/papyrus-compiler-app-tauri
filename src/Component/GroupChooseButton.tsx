/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import is from '@sindresorhus/is'
import { type PopoverMenuButtonProps } from 'App/Component/UI/PopoverMenu'
import * as PopoverMenu from 'App/Component/UI/PopoverMenu'
import { type Groups } from 'App/Lib/Conf/ConfZod'
import { groupRecordToArray } from 'App/Lib/Group/GroupRecordToArray'
import { type GroupWithId } from 'App/Type/GroupWithId'

function GroupChooseButton({
  onGroupClick,
  groups,
  ...props
}: Omit<PopoverMenuButtonProps, 'onClick'> & {
  groups: Groups
  onGroupClick: (group: GroupWithId) => void
}) {
  const nonEmptyGroups = groupRecordToArray(groups).filter((group) => is.nonEmptyArray(group.scripts))

  if (is.emptyArray(nonEmptyGroups)) {
    return null
  }

  return (
    <PopoverMenu.Root as="div" key="choose-group-popover">
      <PopoverMenu.Button {...props} />

      <PopoverMenu.Transition>
        <PopoverMenu.Panel>
          {nonEmptyGroups.map((group) => (
            <PopoverMenu.Item
              key={group.id}
              onClick={() => {
                onGroupClick(group)
              }}
            >
              {group.name}
            </PopoverMenu.Item>
          ))}
        </PopoverMenu.Panel>
      </PopoverMenu.Transition>
    </PopoverMenu.Root>
  )
}

export default GroupChooseButton
