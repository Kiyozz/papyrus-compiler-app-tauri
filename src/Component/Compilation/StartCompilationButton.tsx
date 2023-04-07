/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { PlayIcon } from '@heroicons/react/24/solid'
import Button, { type ButtonProps } from 'App/Component/UI/Button'
import { useTranslation } from 'react-i18next'

const StartCompilationButton = ({
  disabled,
  onCompilationStart,
  ...props
}: Omit<ButtonProps, 'onClick' | 'startIcon'> & { onCompilationStart: () => void }) => {
  const { t } = useTranslation()

  return (
    <Button disabled={disabled} onClick={onCompilationStart} startIcon={<PlayIcon />} {...props}>
      {t('common.start')}
    </Button>
  )
}

export default StartCompilationButton
