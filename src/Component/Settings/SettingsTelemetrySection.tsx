/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Switch from 'App/Component/UI/Switch'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useMatomo } from 'App/Hook/UseMatomo'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

function SettingsTelemetrySection() {
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()
  const conf = useConf({
    onSuccess: (conf) => {
      if (conf.telemetry.use) {
        trackEvent(
          {
            category: 'Conf',
            action: 'Change telemetry',
            name: 'Enable',
          },
          { force: true },
        )
      }
    },
  })
  const updateConf = useUpdateConf()

  if (conf.isLoading) return <>Loading...</>
  if (!conf.isSuccess) return <Navigate to="/" />

  const telemetryUse = conf.data.telemetry.use

  return (
    <SettingsSection
      id="telemetry-section"
      title={t('common.telemetry.title')}
      description={t('common.telemetry.text')}
    >
      <Switch
        className="mt-5"
        name="telemetry"
        checked={telemetryUse}
        onChange={async (checked) => {
          // If user disable telemetry, we send an event before to track it
          if (conf.data.telemetry.use && !checked) {
            trackEvent({
              category: 'Conf',
              action: 'Change telemetry',
              name: 'Disable',
            })
          }

          await updateConf.mutateAsync({
            telemetry: {
              use: checked,
            },
          })
        }}
        label={t('page.settings.sections.theme.activateTelemetry')}
      />
    </SettingsSection>
  )
}

export default SettingsTelemetrySection
