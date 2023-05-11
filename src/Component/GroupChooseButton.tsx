/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { ChevronDownIcon } from '@heroicons/react/20/solid'
import is from '@sindresorhus/is'
import * as Button from 'App/Component/UI/Button'
import * as FloatingMenu from 'App/Component/UI/FloatingMenu'
import { type Groups } from 'App/Lib/Conf/ConfZod'
import { groupRecordToArray } from 'App/Lib/Group/GroupRecordToArray'
import { type GroupWithId } from 'App/Type/GroupWithId'

function GroupChooseButton({
  onGroupClick,
  groups,
  children,
  ...props
}: Omit<FloatingMenu.FloatingMenuButtonProps, 'onClick'> & {
  groups: Groups
  onGroupClick: (group: GroupWithId) => void
}) {
  const nonEmptyGroups = groupRecordToArray(groups).filter((group) => is.nonEmptyArray(group.scripts))

  if (is.emptyArray(nonEmptyGroups)) {
    return null
  }

  return (
    <FloatingMenu.Root as="div" key="choose-group-popover">
      <FloatingMenu.Button {...props}>
        <Button.Icon edge={children != null ? 'start' : undefined}>
          <ChevronDownIcon />
        </Button.Icon>
        {children}
      </FloatingMenu.Button>

      <FloatingMenu.Transition>
        <FloatingMenu.Panel>
          {nonEmptyGroups.map((group) => (
            <FloatingMenu.Item
              key={group.id}
              onClick={() => {
                onGroupClick(group)
              }}
            >
              {group.name}
            </FloatingMenu.Item>
          ))}
        </FloatingMenu.Panel>
      </FloatingMenu.Transition>
    </FloatingMenu.Root>
  )
}

export default GroupChooseButton
