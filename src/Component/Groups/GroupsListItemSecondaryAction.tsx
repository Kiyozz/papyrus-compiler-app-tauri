/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { PencilIcon, TrashIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import * as Button from 'App/Component/UI/Button'
import { useTranslation } from 'react-i18next'
import * as FloatingMenu from 'App/Component/UI/FloatingMenu'

const GroupsListItemSecondaryAction = ({
  onTryRemove,
  onClickEdit,
}: {
  onTryRemove: () => void
  onClickEdit: () => void
}) => {
  const { t } = useTranslation()

  return (
    <FloatingMenu.Root as="div" key="choose-group-action">
      <FloatingMenu.Button variant="ghost" className="-mx-2.5 dark:text-gray-300">
        <Button.Icon>
          <EllipsisVerticalIcon />
        </Button.Icon>
      </FloatingMenu.Button>

      <FloatingMenu.Transition>
        <FloatingMenu.Panel className="mt-0">
          <FloatingMenu.Item onClick={onClickEdit} className="flex gap-x-3">
            <Button.Icon edge="start">
              <PencilIcon color="error" />
            </Button.Icon>
            {t('common.edit')}
          </FloatingMenu.Item>
          <FloatingMenu.Item onClick={onTryRemove} className="flex gap-x-3">
            <Button.Icon edge="start">
              <TrashIcon className="text-red-300" />
            </Button.Icon>
            {t('common.remove')}
          </FloatingMenu.Item>
        </FloatingMenu.Panel>
      </FloatingMenu.Transition>
    </FloatingMenu.Root>
  )
}

export default GroupsListItemSecondaryAction
