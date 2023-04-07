/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TextField from '@mui/material/TextField'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import TutorialTooltip from 'App/Component/Tutorial/Settings/TutorialTooltip'
import Input from 'App/Component/UI/Input'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useMatomo } from 'App/Hook/UseMatomo'
import { type Ref, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import { useUpdateEffect } from 'usehooks-ts'
import { z } from 'zod'

const hardMinConcurrentCompilationScripts = 1

const ConcurrentScriptsZod = z.preprocess(
  (a) => parseInt(z.string().parse(a), 10),
  z.number().min(hardMinConcurrentCompilationScripts),
)

function SettingsCompilationSection() {
  const { t } = useTranslation()
  const conf = useConf()
  const updateConf = useUpdateConf()
  const { refs } = useSettingsTutorial()
  const { trackEvent } = useMatomo()
  const [concurrentScripts, setConcurrentScripts] = useState(conf.data?.compilation.concurrentScripts ?? 15)

  useUpdateEffect(() => {
    if (concurrentScripts >= hardMinConcurrentCompilationScripts) {
      updateConf.mutate({
        compilation: {
          concurrentScripts,
        },
      })
      trackEvent({
        category: 'Conf',
        action: 'Change concurrent scripts',
        value: concurrentScripts,
      })
    }
  }, [concurrentScripts])

  if (conf.isLoading) return <>Loading...</>
  if (!conf.isSuccess) return <Navigate to="/" />

  return (
    <SettingsSection
      id="compilation-section"
      title={t('page.settings.sections.compilation.title')}
      description="Informations optionnelles sur le fonctionnement de la compilation."
    >
      <TutorialTooltip
        title={t('common.settingsTutorial.settings.concurrent')}
        step="settings-concurrent"
        placement="top-start"
      >
        <span ref={refs['settings-concurrent'] as Ref<HTMLSpanElement>} className="mt-5 block">
          <Input
            helpText={t('page.settings.sections.compilation.concurrentScripts.helperText')}
            id="compilation-concurrentScripts-input"
            label={t('page.settings.sections.compilation.concurrentScripts.label')}
            name="compilation-concurrentScripts"
            onChange={(v) => {
              const safeValue = ConcurrentScriptsZod.safeParse(v.currentTarget.value)

              if (safeValue.success) {
                setConcurrentScripts(safeValue.data)
              } else {
                setConcurrentScripts(0)
              }
            }}
            value={concurrentScripts === 0 ? '' : concurrentScripts}
          />
        </span>
      </TutorialTooltip>
    </SettingsSection>
  )
}

export default SettingsCompilationSection
