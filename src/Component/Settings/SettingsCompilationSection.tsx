/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TextField from '@mui/material/TextField'
import is from '@sindresorhus/is'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import TutorialTooltip from 'App/Component/Tutorial/Settings/TutorialTooltip'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { O, pipe } from 'App/Lib/FpTs'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

const safeParseInt = (v: string): O.Option<number> =>
  pipe(
    v,
    (v) => parseInt(v, 10),
    (v) => (Number.isNaN(v) ? O.none : O.some(v)),
  )

const hardMaxConcurrentCompilationScripts = 100

function SettingsCompilationSection() {
  const { t } = useTranslation()
  const conf = useConf()
  const updateConf = useUpdateConf()
  const { refs } = useSettingsTutorial()

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
            const newValue = pipe(
              v.currentTarget.value,
              (v) => (is.emptyString(v) ? '0' : v),
              O.fromPredicate(is.numericString),
              O.chain(safeParseInt),
              O.map((v) => (v > hardMaxConcurrentCompilationScripts ? hardMaxConcurrentCompilationScripts : v)),
              O.map((v) => (v < 0 ? 1 : v)),
            )

            if (O.isSome(newValue)) {
              updateConf.mutate({
                compilation: {
                  concurrentScripts: newValue.value,
                },
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
