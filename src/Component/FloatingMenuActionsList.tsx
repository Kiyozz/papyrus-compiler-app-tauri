/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type MenuProps } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import * as FloatingMenu from 'App/Component/UI/FloatingMenu'
import cx from 'classnames'
import { useTranslation } from 'react-i18next'

const FloatingMenuActionsList = ({
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
    <FloatingMenu.Root as="div" key="actions-popover" {...props}>
      {(state) => (
        <>
          <FloatingMenu.Button disabled={disabled.button} variant="secondary">
            <span>{t('common.actions')}</span>
            <ChevronDownIcon className="h-[1em] w-[1em]" />
          </FloatingMenu.Button>

          <FloatingMenu.Transition>
            <FloatingMenu.Panel className={cx(children != null && 'divide-y divide-gray-100')} position={position}>
              <div>
                <FloatingMenu.Item onClick={onAll} disabled={disabled.all}>
                  {t('common.select.all')}
                </FloatingMenu.Item>
                <FloatingMenu.Item onClick={onNone} disabled={disabled.none}>
                  {t('common.select.none')}
                </FloatingMenu.Item>
                <FloatingMenu.Item onClick={onInvert} disabled={disabled.invert}>
                  {t('common.select.invert')}
                </FloatingMenu.Item>
              </div>
              {typeof children === 'function' ? children(state) : children}
            </FloatingMenu.Panel>
          </FloatingMenu.Transition>
        </>
      )}
    </FloatingMenu.Root>
  )
}

export default FloatingMenuActionsList
