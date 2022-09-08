/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TextField from '@mui/material/TextField'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import { useTranslation } from 'react-i18next'

function SettingsCompilationSection() {
  const { t } = useTranslation()

  const concurrentScripts = 15

  return (
    <SettingsSection id="compilation-section" title={t('page.settings.sections.compilation.title')}>
      <TextField
        fullWidth
        helperText={t('page.settings.sections.compilation.concurrentScripts.helperText')}
        id="compilation-concurrentScripts-input"
        label={t('page.settings.sections.compilation.concurrentScripts.label')}
        name="compilation-concurrentScripts"
        //onChange={onChangeConcurrentScripts}
        //value={compilation.concurrentScripts === 0 ? '' : compilation.concurrentScripts}
        value={concurrentScripts}
      />
    </SettingsSection>
  )
}

export default SettingsCompilationSection
