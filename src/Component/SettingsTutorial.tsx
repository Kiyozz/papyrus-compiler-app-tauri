/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TutorialCompilationAddGroupFromScriptsList from 'App/Component/Tutorial/Settings/Steps/Compilation/TutorialCompilationAddGroupFromScriptsList'
import TutorialCompilationAddScripts from 'App/Component/Tutorial/Settings/Steps/Compilation/TutorialCompilationAddScripts'
import TutorialCompilationCompile from 'App/Component/Tutorial/Settings/Steps/Compilation/TutorialCompilationCompile'
import TutorialSettingsCompiler from 'App/Component/Tutorial/Settings/Steps/Settings/TutorialSettingsCompiler'
import TutorialSettingsConcurrent from 'App/Component/Tutorial/Settings/Steps/Settings/TutorialSettingsConcurrent'
import TutorialSettingsGame from 'App/Component/Tutorial/Settings/Steps/Settings/TutorialSettingsGame'
import TutorialSettingsMo2 from 'App/Component/Tutorial/Settings/Steps/Settings/TutorialSettingsMo2'
import TutorialDocumentation from 'App/Component/Tutorial/Settings/Steps/TutorialDocumentation'
import TutorialWelcome from 'App/Component/Tutorial/Settings/Steps/TutorialWelcome'
import { useSettingsTutorial } from 'App/Hook/Tutorial/UseSettingsTutorial'
import { match } from 'ts-pattern'

const SettingsTutorial = () => {
  const { step } = useSettingsTutorial()

  if (step.none || step.val === 'end') return null

  return match(step.val)
    .with('welcome', () => <TutorialWelcome />)
    .with('settings-game', () => <TutorialSettingsGame />)
    .with('settings-compiler', () => <TutorialSettingsCompiler />)
    .with('settings-concurrent', () => <TutorialSettingsConcurrent />)
    .with('settings-mo2', () => <TutorialSettingsMo2 />)
    .with('compilation-add-scripts', () => <TutorialCompilationAddScripts />)
    .with('compilation-compile', () => <TutorialCompilationCompile />)
    .with('compilation-create-group-from-scripts-list', () => <TutorialCompilationAddGroupFromScriptsList />)
    .with('documentation', () => <TutorialDocumentation />)
    .exhaustive()
}

export default SettingsTutorial
