/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import Alert from '@mui/material/Alert'
import InputDialog from 'App/Component/Form/InputDialog'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import TutorialTooltip from 'App/Component/Tutorial/Settings/TutorialTooltip'
import Switch from 'App/Component/UI/Switch'
import { isCheckConfQueryError, useCheckConf } from 'App/Hook/Conf/UseCheckConf'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useMatomo } from 'App/Hook/UseMatomo'
import { type CheckConfErrorTypes } from 'App/Lib/Conf/CheckConfTypes'
import { enterPageAnimate } from 'App/Lib/Framer'
import { toExecutable } from 'App/Lib/ToExecutable'
import { fromNullable } from 'App/Lib/TsResults'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import { Some } from 'ts-results'

const MotionAlert = motion(Alert)

function SettingsMo2Section() {
  const { t } = useTranslation()
  const { trackEvent } = useMatomo()
  const conf = useConf()
  const updateConf = useUpdateConf()
  const checkConf = useCheckConf(fromNullable(conf.data))
  const { refs } = useSettingsTutorial()

  if (conf.isLoading) return <>Loading...</>
  if (!conf.isSuccess) return <Navigate to="/" />

  const mo2Use = conf.data.mo2.use
  const mo2Instance = conf.data.mo2.instance
  const hasAnyMo2Error = isCheckConfQueryError(
    checkConf,
    Some(['mo2InstanceDoesNotExist', 'mo2InstanceIsNotSet', 'mo2InstanceNoModsFolder'] satisfies CheckConfErrorTypes[]),
  )

  return (
    <SettingsSection
      title={t('page.settings.sections.mo2.title')}
      id="mo2-section"
      ref={refs['settings-mo2']}
      description="Si vous utilisez PCA en dehors de MO2, ajoutez les informations de l'instance MO2 que vous utilisez."
    >
      <TutorialTooltip title={t('common.settingsTutorial.settings.mo2')} step="settings-mo2" placement="top-end">
        <motion.div layout>
          <Switch
            name="mo2"
            key="mo2"
            checked={mo2Use}
            onChange={(checked) => {
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
            label={t('page.settings.sections.mo2.activateIntegration')}
            // layout
          />
        </motion.div>
      </TutorialTooltip>

      <motion.div className="mt-2" layout layoutId="mo2-instance" {...enterPageAnimate}>
        <InputDialog
          defaultValue={mo2Instance ?? ''}
          label={t('page.settings.sections.mo2.instance.label')}
          type="folder"
          id="mo2-instance"
          name="mo2-instance"
          disabled={!mo2Use}
          onChange={(newPath) => {
            updateConf.mutate({
              mo2: {
                instance: newPath,
              },
            })
          }}
          error={hasAnyMo2Error}
        />
      </motion.div>

      <AnimatePresence mode="popLayout">
        {hasAnyMo2Error && (
          <MotionAlert
            key="mo2-error"
            severity="error"
            className="mt-3 dark:bg-red-400/10"
            transition={{ type: 'tween' }}
            {...enterPageAnimate}
            layout
            layoutId="mo2-error"
          >
            {t<string>('common.confCheckError', {
              context: !isCheckConfQueryError(checkConf) ? 'unknown' : checkConf.data.val.type,
              gameExe: toExecutable(conf.data.game.type),
            })}
          </MotionAlert>
        )}
      </AnimatePresence>
    </SettingsSection>
  )
}

export default SettingsMo2Section
