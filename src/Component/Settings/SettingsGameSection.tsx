/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import HelpIcon from '@mui/icons-material/Help'
import Alert from '@mui/material/Alert'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Tooltip from '@mui/material/Tooltip'
import TextFieldDialog from 'App/Component/Form/TextFieldDialog'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import TutorialTooltip from 'App/Component/Tutorial/Settings/TutorialTooltip'
import { isCheckConfQueryError, useCheckConf } from 'App/Hook/Conf/UseCheckConf'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useMatomo } from 'App/Hook/UseMatomo'
import { type GameType } from 'App/Lib/Conf/ConfZod'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { toExecutable } from 'App/Lib/ToExecutable'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import { fromNullable } from 'App/Lib/TsResults'
import { Some } from 'ts-results'
import { exitAlertAnimate } from 'App/Lib/Framer'

const MotionAlert = motion(Alert)

function SettingsGameSection() {
  const { t } = useTranslation()
  const conf = useConf()
  const updateConf = useUpdateConf()
  const checkConf = useCheckConf(fromNullable(conf.data))
  const { refs } = useSettingsTutorial()
  const { trackEvent } = useMatomo()

  const games: Array<{ value: GameType; label: string }> = [
    {
      value: 'Skyrim LE',
      label: t('page.settings.sections.game.games.le'),
    },
    {
      value: 'Skyrim SE/AE',
      label: t('page.settings.sections.game.games.se'),
    },
    {
      value: 'Skyrim VR',
      label: t('page.settings.sections.game.games.vr'),
    },
    {
      value: 'Fallout 4',
      label: t('page.settings.sections.game.games.fo4'),
    },
  ]

  if (conf.isLoading) return <>Loading</>

  if (!conf.isSuccess) return <Navigate to="/" />

  const gameType = conf.data.game.type
  const gamePath = conf.data.game.path
  const gameCompilerPath = conf.data.compilation.compilerPath
  const isGameExeError = isCheckConfQueryError(checkConf, Some(['gameExeDoesNotExist'] as const))

  return (
    <SettingsSection id="game-section" sectionTitle={t('page.settings.sections.game.title')} gutterTop={false}>
      <TutorialTooltip
        placement="top-start"
        title={t('common.settingsTutorial.settings.game')}
        step="settings-game"
        ref={refs['settings-game']}
      >
        <FormControl
          component={motion.fieldset}
          fullWidth
          layout
          layoutId="settings-game-game-type"
          error={isGameExeError}
        >
          <RadioGroup
            classes={{ row: 'justify-between' }}
            row
            onChange={(evt, value) => {
              trackEvent({
                category: 'Conf',
                action: 'Change game',
                name: value,
              })
              updateConf.mutate({
                game: {
                  type: value as GameType,
                },
                compilation: {
                  flag: (value as GameType) === 'Fallout 4' ? 'Institute_Papyrus_Flags.flg' : 'TESV_Papyrus_Flags.flg',
                },
              })
            }}
            value={gameType}
          >
            {games.map((game) => {
              return (
                <FormControlLabel
                  key={game.value}
                  classes={{
                    label: gameType === game.value && isGameExeError ? 'text-red-400' : '',
                  }}
                  control={<Radio />}
                  label={game.label}
                  value={game.value}
                />
              )
            })}
          </RadioGroup>
        </FormControl>
      </TutorialTooltip>

      <motion.div className="mt-3" id="settings-game-game-folder" layout layoutId="settings-game-game-folder">
        <TextFieldDialog
          label={
            <>
              {t('page.settings.sections.game.gameFolder.label')}

              <Tooltip
                title={t('page.settings.sections.game.gameFolder.tooltip', { executable: toExecutable(gameType) })}
              >
                <HelpIcon className="ml-1" />
              </Tooltip>
            </>
          }
          id="settings-game-game-folder-text-field"
          defaultValue={gamePath}
          onChange={(newValue) => {
            // update the game path in config
            updateConf.mutate({
              game: {
                path: newValue,
              },
            })
          }}
          type="folder"
          error={isCheckConfQueryError(checkConf, Some(['gamePathDoesNotExist'] as const))}
        />
      </motion.div>

      <motion.div className="mt-3" id="settings-game-compiler" layout>
        <TutorialTooltip
          title={t('common.settingsTutorial.settings.compiler')}
          step="settings-compiler"
          ref={refs['settings-compiler']}
        >
          <TextFieldDialog
            ref={refs['settings-compiler']}
            label={
              <>
                {t('page.settings.sections.game.compiler.label')}

                <Tooltip title={t('page.settings.sections.game.compiler.tooltip')}>
                  <HelpIcon className="ml-1" />
                </Tooltip>
              </>
            }
            defaultValue={gameCompilerPath}
            type="file"
            onChange={(newValue) => {
              // update the compiler path in config
              updateConf.mutate({
                compilation: {
                  compilerPath: newValue,
                },
              })
            }}
            placeholder={t('common.select.file')}
            error={isCheckConfQueryError(checkConf, Some(['compilerPathDoesNotExist'] as const))}
          />
        </TutorialTooltip>
      </motion.div>
      <AnimatePresence mode="popLayout">
        {isCheckConfQueryError(
          checkConf,
          Some(['gameExeDoesNotExist', 'gamePathDoesNotExist', 'compilerPathDoesNotExist'] as const),
        ) && (
            <MotionAlert
              key="error-alert"
              severity="error"
              className="mt-3 dark:bg-red-400/10"
              {...exitAlertAnimate}
              layout
              layoutId="error-alert"
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

export default SettingsGameSection
