/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import { useTranslation } from 'react-i18next'

function SettingsTelemetrySection() {
  const { t } = useTranslation()

  const telemetryUse = false

  return (
    <SettingsSection id="telemetry-section" title={t<string>('page.settings.sections.telemetry.title')}>
      <FormControlLabel
        control={<Checkbox checked={telemetryUse} name="telemetry" />}
        label={<span className="dark:text-white">{t('page.settings.sections.telemetry.use.label')}</span>}
      />
    </SettingsSection>
  )
}

export default SettingsTelemetrySection
