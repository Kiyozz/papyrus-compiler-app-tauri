/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { PopoverMenuActionsList } from 'App/Component/PopoverMenuActionsList'
import PopoverMenu from 'App/Component/UI/PopoverMenu'
import { type FileScript } from 'App/Lib/Conf/ConfZod'
import { type ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

const RecentScriptsDialogActions = ({
  onClear,
  onDetails,
  detailsText,
  scriptsToLoad,
  disabled = {},
  ...props
}: ComponentProps<typeof PopoverMenuActionsList> & {
  onClear: () => void
  onDetails: () => void
  detailsText: string
  scriptsToLoad: FileScript[]
  disabled?: {
    clear?: boolean
    details?: boolean
    load?: boolean
  }
}) => {
  const { t } = useTranslation()

  return (
    <PopoverMenuActionsList
      {...props}
      disabled={{
        ...disabled,
        all: disabled.all,
        none: disabled.none,
        invert: disabled.invert,
      }}
    >
      <PopoverMenu.Item onClick={onDetails} disabled={disabled.details}>
        {detailsText}
      </PopoverMenu.Item>
      <PopoverMenu.Item onClick={onClear} disabled={disabled.clear}>
        {t('common.clearList')}
      </PopoverMenu.Item>
    </PopoverMenuActionsList>
  )
}

export default RecentScriptsDialogActions
