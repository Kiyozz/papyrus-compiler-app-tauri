/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Switch from 'App/Component/UI/Switch'
import { twMerge } from 'tailwind-merge'
import { useTranslation } from 'react-i18next'

const GroupMoreDetailsCheckbox = ({
  className,
  checked,
  onChange,
}: {
  className?: string
  checked: boolean
  onChange: (checked: boolean) => void
}) => {
  const { t } = useTranslation()

  return (
    <Switch
      className={twMerge('ml-auto', className)}
      checked={checked}
      onChange={onChange}
      label={t('common.moreDetails')}
      name="group-more-details"
    />
  )
}

export default GroupMoreDetailsCheckbox
