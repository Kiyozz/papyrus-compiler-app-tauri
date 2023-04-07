/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import HelpIcon from '@mui/icons-material/Help'
import Alert from '@mui/material/Alert'
import Tooltip from '@mui/material/Tooltip'
import TextFieldDialog from 'App/Component/Form/TextFieldDialog'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import TutorialTooltip from 'App/Component/Tutorial/Settings/TutorialTooltip'
import RadioGroup from 'App/Component/UI/RadioGroup'
import { isCheckConfQueryError, useCheckConf } from 'App/Hook/Conf/UseCheckConf'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { useMatomo } from 'App/Hook/UseMatomo'
import { type GameType } from 'App/Lib/Conf/ConfZod'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { toExecutable } from 'App/Lib/ToExecutable'
import { AnimatePresence, motion } from 'framer-motion'
import { type Ref } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import { fromNullable } from 'App/Lib/TsResults'
import { Some } from 'ts-results'
import { exitAlertAnimate } from 'App/Lib/Framer'

const MotionAlert = motion(Alert)
const MotionRadioGroup = motion(RadioGroup)

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
    <SettingsSection
      id="game-section"
      title={t('page.settings.sections.game.title')}
      description="Ajoutez les informations de votre environnement."
    >
      <TutorialTooltip
        placement="top-start"
        title={t('common.settingsTutorial.settings.game')}
        step="settings-game"
        ref={refs['settings-game']}
      >
        <div>
          <MotionRadioGroup
            className="mt-5"
            layout
            layoutId="settings-game-game-type"
            error={isGameExeError}
            name="settings-game-game-type"
            items={games.map((game) => ({
              id: game.value,
              label: game.label,
              value: game.value,
            }))}
            onChange={(evt, value) => {
              console.log(value)
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
          />
        </div>
      </TutorialTooltip>

      <motion.div className="mt-2" id="settings-game-game-folder" layout layoutId="settings-game-game-folder">
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
          name="settings-game-game-folder-text-field"
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

      <motion.div className="mt-2" id="settings-game-compiler" layout>
        <TutorialTooltip
          title={t('common.settingsTutorial.settings.compiler')}
          step="settings-compiler"
          ref={refs['settings-compiler']}
        >
          <div>
            <TextFieldDialog
              ref={refs['settings-compiler'] as Ref<HTMLInputElement>}
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
              id="settings-game-compiler-folder-text-field"
              name="settings-game-compiler-folder-text-field"
              placeholder={t('common.select.file')}
              error={isCheckConfQueryError(checkConf, Some(['compilerPathDoesNotExist'] as const))}
            />
          </div>
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
