/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Alert from '@mui/material/Alert'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import TextFieldDialog from 'App/Component/Form/TextFieldDialog'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import TutorialTooltip from 'App/Component/Tutorial/Settings/TutorialTooltip'
import { isCheckConfQueryError, useCheckConf } from 'App/Hook/Conf/UseCheckConf'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useMatomo } from 'App/Hook/UseMatomo'
import { O, some } from 'App/Lib/FpTs'
import { toExecutable } from 'App/Lib/ToExecutable'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

function SettingsMo2Section() {
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()
  const conf = useConf()
  const updateConf = useUpdateConf()
  const checkConf = useCheckConf(O.fromNullable(conf.data))
  const { refs } = useSettingsTutorial()

  if (conf.isLoading) return <>Loading...</>
  if (!conf.isSuccess) return <Navigate to="/" />

  const mo2Use = conf.data.mo2.use
  const mo2Instance = conf.data.mo2.instance
  const hasAnyMo2Error = isCheckConfQueryError(
    checkConf,
    some(['mo2InstanceDoesNotExist', 'mo2InstanceIsNotSet', 'mo2InstanceNoModsFolder']),
  )

  return (
    <SettingsSection sectionTitle={t('page.settings.sections.mo2.title')} id="mo2-section" ref={refs['settings-mo2']}>
      <TutorialTooltip title={t('common.settingsTutorial.settings.mo2')} step="settings-mo2" placement="top-end">
        <FormControlLabel
          control={
            <Checkbox
              checked={mo2Use}
              id="mo2"
              name="mo2"
              onChange={(evt) => {
                const checked = evt.currentTarget.checked

                updateConf.mutate({
                  mo2: {
                    use: checked,
                    instance: checked ? mo2Instance : undefined,
                  },
                })
                trackEvent({
                  category: 'Conf',
                  action: 'Use Mo2',
                  name: checked ? 'Enable' : 'Disable',
                })
              }}
            />
          }
          label={<span className="dark:text-white">{t('common.activate')}</span>}
        />
      </TutorialTooltip>

      {mo2Use && (
        <TextFieldDialog
          className="mt-2"
          defaultValue={mo2Instance ?? ''}
          label={t('page.settings.sections.mo2.instance.label')}
          type="folder"
          onChange={(newPath) => {
            updateConf.mutate({
              mo2: {
                instance: newPath,
              },
            })
          }}
          error={hasAnyMo2Error}
        />
      )}

      {hasAnyMo2Error && (
        <Alert severity="error" className="mt-3 dark:bg-red-400/10">
          {t<string>('common.confCheckError', {
            context: !isCheckConfQueryError(checkConf) ? 'unknown' : checkConf.data.value.type,
            gameExe: toExecutable(conf.data.game.type),
          })}
        </Alert>
      )}
    </SettingsSection>
  )
}

export default SettingsMo2Section
