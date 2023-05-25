/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import InputDialog from 'App/Component/Form/InputDialog'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import TutorialTooltip from 'App/Component/Tutorial/Settings/TutorialTooltip'
import * as Alert from 'App/Component/UI/Alert'
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
import { Trans, useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import { Some } from 'ts-results'

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
      <TutorialTooltip
        title={
          <Trans i18nKey="common.settingsTutorial.settings.mo2">
            <strong />
          </Trans>
        }
        step="settings-mo2"
        side="top"
      >
        <motion.div layout>
          <Switch
            className="mt-5"
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
          placeholder={t('common.select.folder')}
          disabled={!mo2Use}
          resetOnDisabled
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
          <Alert.Root key="mo2-error" severity="error" className="mt-3 p-4" asChild>
            <motion.div transition={{ type: 'tween' }} {...enterPageAnimate} layout layoutId="mo2-error">
              <Alert.Content>
                <Alert.Icon severity="error" />
                <Alert.Message severity="error">
                  {t<string>('common.confCheckError', {
                    context: !isCheckConfQueryError(checkConf) ? 'unknown' : checkConf.data.val.type,
                    gameExe: toExecutable(conf.data.game.type),
                  })}
                </Alert.Message>
              </Alert.Content>
            </motion.div>
          </Alert.Root>
        )}
      </AnimatePresence>
    </SettingsSection>
  )
}

export default SettingsMo2Section
