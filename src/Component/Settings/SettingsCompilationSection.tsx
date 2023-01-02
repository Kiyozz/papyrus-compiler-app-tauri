/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TextField from '@mui/material/TextField'
import is from '@sindresorhus/is'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { O, pipe } from 'App/Util/FpTs'
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

  if (conf.isLoading) return <>Loading...</>
  if (!conf.isSuccess) return <Navigate to="/" />

  const concurrentScripts = conf.data.compilation.concurrentScripts

  return (
    <SettingsSection id="compilation-section" title={t<string>('page.settings.sections.compilation.title')}>
      <TextField
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
    </SettingsSection>
  )
}

export default SettingsCompilationSection
