/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
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
import { GameType } from 'App/Enum/GameType'
import { useConf } from 'App/Hook/UseConf'
import { useConfKey } from 'App/Hook/useConfKey'
import { toExecutable } from 'App/Util/ToExecutable'
import { useTranslation } from 'react-i18next'

function SettingsGameSection() {
  const { t } = useTranslation()
  const conf = useConf()
  const gameConf = useConfKey('game')
  const compilerConf = useConfKey('compilation')

  const games = [
    {
      value: GameType.le,
      label: t('page.settings.sections.game.games.le'),
    },
    {
      value: GameType.se,
      label: t('page.settings.sections.game.games.se'),
    },
    {
      value: GameType.vr,
      label: t('page.settings.sections.game.games.vr'),
    },
    {
      value: GameType.fo4,
      label: t('page.settings.sections.game.games.fo4'),
    },
  ]

  if (gameConf.isLoading || compilerConf.isLoading) return <>Loading</>

  if (!gameConf.data || !compilerConf.data) return <>Unknown error</>

  const gameType = gameConf.data.type
  const gamePath = gameConf.data.path
  const gameCompilerPath = compilerConf.data.compilerPath

  return (
    <SettingsSection id="game-section" title={t<string>('page.settings.sections.game.title')} gutterTop={false}>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup
          classes={{ row: 'justify-between' }}
          row
          onChange={(evt, value) => {
            conf.set({
              game: {
                type: value as GameType,
              },
            })
          }}
          value={gameConf.data.type}
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
            conf.set('game.path', newValue)
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
            conf.set('compilation.compilerPath', newValue)
          }}
          placeholder={t<string>('common.select.file')}
        />
      </div>
    </SettingsSection>
  )
}

export default SettingsGameSection
