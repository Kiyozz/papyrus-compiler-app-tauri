/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import HelpIcon from '@mui/icons-material/Help'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Tooltip from '@mui/material/Tooltip'
import TextFieldDialog from 'App/Component/Form/TextFieldDialog'
import SettingsSection from 'App/Component/Settings/SettingsSection'
import { GameType } from 'App/Lib/Conf/ConfDecoder'
import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { toExecutable } from 'App/Util/ToExecutable'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'

function SettingsGameSection() {
  const { t } = useTranslation()
  const conf = useConf()
  const updateConf = useUpdateConf()

  const games: { value: GameType; label: string }[] = [
    {
      value: 'Skyrim LE',
      label: t('page.settings.sections.game.games.le'),
    },
    {
      value: 'Skyrim SE',
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

  return (
    <SettingsSection id="game-section" title={t<string>('page.settings.sections.game.title')} gutterTop={false}>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          classes={{ row: 'justify-between' }}
          row
          onChange={(evt, value) => {
            updateConf.mutate({
              game: {
                type: value as GameType,
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
                  label: 'dark:text-white',
                }}
                control={<Radio />}
                label={game.label}
                value={game.value}
              />
            )
          })}
        </RadioGroup>
      </FormControl>

      <div className="mt-3" id="settings-game-game-folder">
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
        />
      </div>

      <div className="mt-3" id="settings-game-compiler">
        <TextFieldDialog
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
          placeholder={t<string>('common.select.file')}
        />
      </div>
    </SettingsSection>
  )
}

export default SettingsGameSection
