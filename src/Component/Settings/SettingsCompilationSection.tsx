/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TextField from '@mui/material/TextField'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import TutorialTooltip from 'App/Component/Tutorial/Settings/TutorialTooltip'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useMatomo } from 'App/Hook/UseMatomo'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import { z } from 'zod'

const hardMaxConcurrentCompilationScripts = 100

const ConcurrentScriptsZod = z.preprocess(
  (a) => parseInt(z.string().parse(a), 10),
  z.number().min(1).max(hardMaxConcurrentCompilationScripts),
)

function SettingsCompilationSection() {
  const { t } = useTranslation()
  const conf = useConf()
  const updateConf = useUpdateConf()
  const { refs } = useSettingsTutorial()
  const { trackEvent } = useMatomo()

  if (conf.isLoading) return <>Loading...</>
  if (!conf.isSuccess) return <Navigate to="/" />

  const concurrentScripts = conf.data.compilation.concurrentScripts

  return (
    <SettingsSection id="compilation-section" sectionTitle={t('page.settings.sections.compilation.title')}>
      <TutorialTooltip
        title={t('common.settingsTutorial.settings.concurrent')}
        step="settings-concurrent"
        placement="top-start"
      >
        <TextField
          ref={refs['settings-concurrent']}
          fullWidth
          helperText={t('page.settings.sections.compilation.concurrentScripts.helperText')}
          id="compilation-concurrentScripts-input"
          label={t('page.settings.sections.compilation.concurrentScripts.label')}
          name="compilation-concurrentScripts"
          onChange={(v) => {
            const nV = ConcurrentScriptsZod.safeParse(v.currentTarget.value)

            if (nV.success) {
              updateConf.mutate({
                compilation: {
                  concurrentScripts: nV.data,
                },
              })
              trackEvent({
                category: 'Conf',
                action: 'Change concurrent scripts',
                value: nV.data,
              })
            }
          }}
          value={concurrentScripts === 0 ? '' : concurrentScripts}
        />
      </TutorialTooltip>
    </SettingsSection>
  )
}

export default SettingsCompilationSection
