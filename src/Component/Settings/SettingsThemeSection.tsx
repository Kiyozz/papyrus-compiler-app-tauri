/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import { Theme } from 'App/Enum/Theme'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

function SettingsThemeSection() {
  const { t } = useTranslation()
  const conf = useConf()
  const updateConf = useUpdateConf()

  if (conf.isLoading) return <>Loading...</>
  if (!conf.isSuccess) return <Navigate to="/" />

  const theme = conf.data.theme
  const themes = [Theme.system, Theme.light, Theme.dark]

  return (
    <SettingsSection id="theme-section" title={t<string>('page.settings.sections.theme.title')}>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          onChange={(evt) => {
            updateConf.mutate({
              theme: evt.target.value as Theme,
            })
          }}
          row
          value={theme}
        >
          {themes.map((theme) => (
            <FormControlLabel
              key={theme}
              classes={{
                label: 'dark:text-white',
              }}
              control={<Radio />}
              label={<>{t(`page.settings.sections.theme.options.${theme}`)}</>}
              value={theme}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </SettingsSection>
  )
}

export default SettingsThemeSection
