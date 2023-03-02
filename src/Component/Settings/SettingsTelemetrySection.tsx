/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import HelpIcon from '@mui/icons-material/Help'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Tooltip from '@mui/material/Tooltip'
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
      sectionTitle={
        <div className="flex items-center gap-2">
          <span>{t('common.telemetry.title')}</span>
          <Tooltip title={t('common.telemetry.text')} placement="top">
            <HelpIcon />
          </Tooltip>
        </div>
      }
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={telemetryUse}
            onChange={async (evt) => {
              const checked = evt.currentTarget.checked

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
            name="telemetry"
          />
        }
        label={<span className="dark:text-white">{t('common.activate')}</span>}
      />
    </SettingsSection>
  )
}

export default SettingsTelemetrySection
