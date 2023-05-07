/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { PlayIcon } from '@heroicons/react/24/solid'
import * as Button from 'App/Component/UI/Button'
import { useTranslation } from 'react-i18next'

const StartCompilationButton = ({
  disabled,
  onCompilationStart,
  ...props
}: Omit<Button.ButtonProps, 'onClick'> & { onCompilationStart: () => void }) => {
  const { t } = useTranslation()

  return (
    <Button.Root disabled={disabled} onClick={onCompilationStart} {...props}>
      <Button.Icon>
        <PlayIcon />
      </Button.Icon>
      {t('common.start')}
    </Button.Root>
  )
}

export default StartCompilationButton
