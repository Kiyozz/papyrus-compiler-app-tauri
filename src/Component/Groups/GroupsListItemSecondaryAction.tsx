/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { PencilIcon, TrashIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import * as Button from 'App/Component/UI/Button'
import { useTranslation } from 'react-i18next'
import * as PopoverMenu from 'App/Component/UI/PopoverMenu'

const GroupsListItemSecondaryAction = ({
  onTryRemove,
  onClickEdit,
}: {
  onTryRemove: () => void
  onClickEdit: () => void
}) => {
  const { t } = useTranslation()

  return (
    <PopoverMenu.Root as="div" key="choose-group-action">
      <PopoverMenu.Button variant="link">
        <Button.Icon>
          <EllipsisVerticalIcon />
        </Button.Icon>
      </PopoverMenu.Button>

      <PopoverMenu.Transition>
        <PopoverMenu.Panel className="mt-0">
          <PopoverMenu.Item onClick={onClickEdit} className="flex gap-x-3">
            <Button.Icon edge="start">
              <PencilIcon color="error" />
            </Button.Icon>
            {t('common.edit')}
          </PopoverMenu.Item>
          <PopoverMenu.Item onClick={onTryRemove} className="flex gap-x-3">
            <Button.Icon edge="start">
              <TrashIcon className="text-red-300" />
            </Button.Icon>
            {t('common.remove')}
          </PopoverMenu.Item>
        </PopoverMenu.Panel>
      </PopoverMenu.Transition>
    </PopoverMenu.Root>
  )
}

export default GroupsListItemSecondaryAction
