/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
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
import { useTranslation } from 'react-i18next'

function SettingsThemeSection() {
  const { t } = useTranslation()

  const theme = Theme.system
  const themes = [Theme.system, Theme.light, Theme.dark]

  return (
    <SettingsSection id="theme-section" title={t<string>('page.settings.sections.theme.title')}>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup /*onChange={onChangeTheme}*/ row value={theme}>
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
