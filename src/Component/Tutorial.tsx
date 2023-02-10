/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import TutorialCompilationAddGroupFromScriptsList from 'App/Component/Tutorial/Steps/Compilation/TutorialCompilationAddGroupFromScriptsList'
import TutorialCompilationAddScripts from 'App/Component/Tutorial/Steps/Compilation/TutorialCompilationAddScripts'
import TutorialCompilationCompile from 'App/Component/Tutorial/Steps/Compilation/TutorialCompilationCompile'
import TutorialSettingsCompiler from 'App/Component/Tutorial/Steps/Settings/TutorialSettingsCompiler'
import TutorialSettingsConcurrent from 'App/Component/Tutorial/Steps/Settings/TutorialSettingsConcurrent'
import TutorialSettingsGame from 'App/Component/Tutorial/Steps/Settings/TutorialSettingsGame'
import TutorialSettingsMo2 from 'App/Component/Tutorial/Steps/Settings/TutorialSettingsMo2'
import TutorialDocumentation from 'App/Component/Tutorial/Steps/TutorialDocumentation'
import TutorialWelcome from 'App/Component/Tutorial/Steps/TutorialWelcome'
import { useTutorial } from 'App/Hook/UseTutorial'
import { isNone } from 'App/Lib/FpTs'
import { match } from 'ts-pattern'

const Tutorial = () => {
  const { step } = useTutorial()

  if (isNone(step) || step.value === 'end') return null

  return match(step.value)
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

export default Tutorial
