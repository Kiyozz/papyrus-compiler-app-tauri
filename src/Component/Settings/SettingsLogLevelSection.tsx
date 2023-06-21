/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import LogLevelChangedDialog from 'App/Component/Dialog/LogLevelChangedDialog'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import RadioGroup from 'App/Component/UI/RadioGroup'
import { useMatomo } from 'App/Hook/UseMatomo'
import { useRestartApp } from 'App/Hook/UseRestartApp'
import { type LogLevel } from 'App/Lib/Conf/ConfZod'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

function SettingsLogLevelSection() {
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()
  const conf = useConf()
  const updateConf = useUpdateConf()
  const [logLevelChanged, setLogLevelChanged] = useState(false)
  const restartApp = useRestartApp()

  if (conf.isLoading) return <>Loading...</>
  if (!conf.isSuccess) return <Navigate to="/" />

  const logLevel = conf.data.logLevel
  const logLevels = ['error', 'warn', 'info', 'debug', 'trace'] as [LogLevel, LogLevel, LogLevel, LogLevel, LogLevel]

  return (
    <>
      <LogLevelChangedDialog
        open={logLevelChanged}
        onRestartLater={() => {
          setLogLevelChanged(false)
        }}
        onRestartNow={() => {
          restartApp().catch((err) => {
            console.error(err)
            setLogLevelChanged(false)
          })
        }}
      />
      <SettingsSection
        id="log-level-section"
        title={t('page.settings.sections.logLevel.title')}
        description={t('page.settings.sections.logLevel.description')}
      >
        <RadioGroup
          className="mt-5"
          onChange={(evt, value) => {
            updateConf.mutate({
              logLevel: value,
            })
            setLogLevelChanged(true)
            trackEvent({
              category: 'Conf',
              action: 'Change LogLevel',
              name: value,
            })
          }}
          value={logLevel}
          name="log-level"
          items={logLevels.map((logLevel) => ({
            id: logLevel,
            label: t(`page.settings.sections.logLevel.options.${logLevel}`),
            value: logLevel,
          }))}
        />
      </SettingsSection>
    </>
  )
}

export default SettingsLogLevelSection
