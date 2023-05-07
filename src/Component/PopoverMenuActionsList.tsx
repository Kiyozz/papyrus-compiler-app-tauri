/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type MenuProps } from '@headlessui/react'
import * as PopoverMenu from 'App/Component/UI/PopoverMenu'
import cx from 'classnames'
import { useTranslation } from 'react-i18next'

export const PopoverMenuActionsList = ({
  onAll,
  onNone,
  onInvert,
  position,
  children,
  disabled = {},
  ...props
}: Omit<MenuProps<'div'>, 'onClose' | 'onLoad'> & {
  onAll: () => void
  onNone: () => void
  onInvert: () => void
  disabled?: {
    all?: boolean
    none?: boolean
    invert?: boolean
    button?: boolean
  }
  position?: 'top-right' | 'bottom'
}) => {
  const { t } = useTranslation()

  return (
    <PopoverMenu.Root as="div" key="actions-popover" {...props}>
      {(state) => (
        <>
          <PopoverMenu.Button disabled={disabled.button}>{t('common.actions')}</PopoverMenu.Button>

          <PopoverMenu.Transition>
            <PopoverMenu.Panel className={cx(children != null && 'divide-y divide-gray-100')} position={position}>
              <div>
                <PopoverMenu.Item onClick={onAll} disabled={disabled.all}>
                  {t('common.select.all')}
                </PopoverMenu.Item>
                <PopoverMenu.Item onClick={onNone} disabled={disabled.none}>
                  {t('common.select.none')}
                </PopoverMenu.Item>
                <PopoverMenu.Item onClick={onInvert} disabled={disabled.invert}>
                  {t('common.select.invert')}
                </PopoverMenu.Item>
              </div>
              {typeof children === 'function' ? children(state) : children}
            </PopoverMenu.Panel>
          </PopoverMenu.Transition>
        </>
      )}
    </PopoverMenu.Root>
  )
}
