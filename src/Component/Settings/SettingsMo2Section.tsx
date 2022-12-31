/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextFieldDialog from 'App/Component/Form/TextFieldDialog'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import { useTranslation } from 'react-i18next'

function SettingsMo2Section() {
  const { t } = useTranslation()

  const mo2Use = true
  const mo2Instance = 'C:\\Program Files (x86)\\Mod Organizer 2'

  return (
    <SettingsSection title={t<string>('page.settings.sections.mo2.title')} id="mo2-section">
      <FormControlLabel
        control={
          <Checkbox
            checked={mo2Use}
            id="mo2"
            name="mo2"
            //onChange={onChangeMo2}
          />
        }
        label={<span className="dark:text-white">{t('page.settings.sections.mo2.use.label')}</span>}
      />

      {mo2Use && (
        <TextFieldDialog
          className="mt-2"
          defaultValue={mo2Instance}
          label={t('page.settings.sections.mo2.instance.label')}
          type="folder"
        />
      )}
    </SettingsSection>
  )
}

export default SettingsMo2Section
