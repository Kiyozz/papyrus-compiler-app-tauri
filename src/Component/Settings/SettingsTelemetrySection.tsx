/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

function SettingsTelemetrySection() {
  const { t } = useTranslation()
  const conf = useConf()
  const updateConf = useUpdateConf()

  if (conf.isLoading) return <>Loading...</>
  if (!conf.isSuccess) return <Navigate to="/" />

  const telemetryUse = conf.data.telemetry.use

  return (
    <SettingsSection id="telemetry-section" sectionTitle={t('page.settings.sections.telemetry.title')}>
      <FormControlLabel
        control={
          <Checkbox
            checked={telemetryUse}
            onChange={(evt) => {
              const checked = evt.currentTarget.checked

              updateConf.mutate({
                telemetry: {
                  use: checked,
                },
              })
            }}
            name="telemetry"
          />
        }
        label={<span className="dark:text-white">{t('page.settings.sections.telemetry.use.label')}</span>}
      />
    </SettingsSection>
  )
}

export default SettingsTelemetrySection
