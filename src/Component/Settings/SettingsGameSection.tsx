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
import { GameTypeEnum } from 'App/Enum/GameTypeEnum'
import { toExecutable } from 'App/Util/ToExecutable'
import { useTranslation } from 'react-i18next'

function SettingsGameSection() {
  const { t } = useTranslation()

  const gameType = GameTypeEnum.se
  const gamePath = 'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Skyrim Special Edition'
  const gameCompilerPath =
    'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Skyrim Special Edition\\Papyrus Compiler\\PapyrusCompiler.exe'

  const games = [
    {
      value: GameTypeEnum.le,
      label: t('page.settings.sections.game.games.le'),
    },
    {
      value: GameTypeEnum.se,
      label: t('page.settings.sections.game.games.se'),
    },
    {
      value: GameTypeEnum.vr,
      label: t('page.settings.sections.game.games.vr'),
    },
    {
      value: GameTypeEnum.fo4,
      label: t('page.settings.sections.game.games.fo4'),
    },
  ]

  return (
    <SettingsSection id="game-section" title={t('page.settings.sections.game.title')} gutterTop={false}>
      <FormControl component="fieldset" fullWidth>
        <RadioGroup classes={{ row: 'justify-between' }} row value={gameType}>
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
          placeholder={t('common.select.file')}
        />
      </div>
    </SettingsSection>
  )
}

export default SettingsGameSection
