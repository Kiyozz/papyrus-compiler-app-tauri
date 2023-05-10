/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid'
import Tooltip from '@mui/material/Tooltip'
import InputDialog from 'App/Component/Form/InputDialog'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import TutorialTooltip from 'App/Component/Tutorial/Settings/TutorialTooltip'
import * as Alert from 'App/Component/UI/Alert'
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
import { enterPageAnimate } from 'App/Lib/Framer'

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
        <motion.div layout layoutId="settings-game-game-type">
          <RadioGroup
            className="mt-5"
            error={isGameExeError}
            name="settings-game-game-type"
            items={games.map((game) => ({
              id: game.value,
              label: game.label,
              value: game.value,
            }))}
            onChange={(evt, value) => {
              trackEvent({
                category: 'Conf',
                action: 'Change game',
                name: value,
              })
              updateConf.mutate({
                game: {
                  type: value,
                },
                compilation: {
                  flag: value === 'Fallout 4' ? 'Institute_Papyrus_Flags.flg' : 'TESV_Papyrus_Flags.flg',
                },
              })
            }}
            value={gameType}
          />
        </motion.div>
      </TutorialTooltip>

      <motion.div className="mt-2" id="settings-game-game-folder" layout layoutId="settings-game-game-folder">
        <InputDialog
          label={
            <div className="flex items-center">
              <span>{t('page.settings.sections.game.gameFolder.label')}</span>

              <Tooltip
                title={t('page.settings.sections.game.gameFolder.tooltip', { executable: toExecutable(gameType) })}
              >
                <span className="ml-1">
                  <QuestionMarkCircleIcon className="h-5 w-5" />
                </span>
              </Tooltip>
            </div>
          }
          id="settings-game-game-folder-text-field"
          name="settings-game-game-folder-text-field"
          placeholder={t('common.select.folder')}
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
            <InputDialog
              ref={refs['settings-compiler'] as Ref<HTMLInputElement>}
              label={
                <div className="flex items-center">
                  <span>{t('page.settings.sections.game.compiler.label')}</span>

                  <Tooltip title={t('page.settings.sections.game.compiler.tooltip')}>
                    <span className="ml-1">
                      <QuestionMarkCircleIcon className="ml-1 h-5 w-5" />
                    </span>
                  </Tooltip>
                </div>
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
          <Alert.Root key="error-alert" severity="error" className="mt-3 p-4" asChild>
            <motion.div
              key="error-alert"
              transition={{ type: 'tween' }}
              {...enterPageAnimate}
              layout
              layoutId="error-alert"
            >
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

export default SettingsGameSection
