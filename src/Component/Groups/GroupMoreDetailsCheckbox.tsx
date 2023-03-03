/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
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
    <FormGroup className={className}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={(evt) => {
              onChange(evt.currentTarget.checked)
            }}
          />
        }
        label={t('common.moreDetails')}
      />
    </FormGroup>
  )
}

export default GroupMoreDetailsCheckbox
