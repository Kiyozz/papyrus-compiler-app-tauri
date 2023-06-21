/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import SettingsSection from 'App/Component/Settings/SettingsSection'
import RadioGroup from 'App/Component/UI/RadioGroup'
import { useMatomo } from 'App/Hook/UseMatomo'
import { type Theme } from 'App/Lib/ThemeDecoder'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

function SettingsThemeSection() {
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()
  const conf = useConf()
  const updateConf = useUpdateConf()

  if (conf.isLoading) return <>Loading...</>
  if (!conf.isSuccess) return <Navigate to="/" />

  const theme = conf.data.theme
  const themes = ['system', 'light', 'dark'] as [Theme, Theme, Theme]

  return (
    <SettingsSection
      id="theme-section"
      title={t('page.settings.sections.theme.title')}
      description={t('page.settings.sections.theme.description')}
    >
      <RadioGroup
        className="mt-5"
        onChange={(evt, value) => {
          updateConf.mutate({
            theme: value,
          })
          trackEvent({
            category: 'Conf',
            action: 'Change theme',
            name: value,
          })
        }}
        value={theme}
        name="theme"
        items={themes.map((theme) => ({
          id: theme,
          label: t(`page.settings.sections.theme.options.${theme}`),
          value: theme,
        }))}
      />
    </SettingsSection>
  )
}

export default SettingsThemeSection
