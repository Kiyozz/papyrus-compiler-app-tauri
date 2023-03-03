/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import PlayIcon from '@mui/icons-material/PlayCircleFilled'
import Button, { type ButtonProps } from '@mui/material/Button'
import { useTranslation } from 'react-i18next'

const StartCompilationButton = ({
  disabled,
  onCompilationStart,
  ...props
}: Omit<ButtonProps, 'onClick' | 'startIcon'> & { onCompilationStart: () => void }) => {
  const { t } = useTranslation()

  return (
    <Button
      color="primary"
      disabled={disabled}
      onClick={onCompilationStart}
      startIcon={<PlayIcon />}
      variant="contained"
      {...props}
    >
      {t('common.start')}
    </Button>
  )
}

export default StartCompilationButton
