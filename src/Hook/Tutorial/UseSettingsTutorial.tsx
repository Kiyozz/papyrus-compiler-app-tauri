/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { isNone, none, O, some } from 'App/Lib/FpTs'
import { createContext, PropsWithChildren, useCallback, useContext, useState, RefObject, useRef, useMemo } from 'react'
import { match } from 'ts-pattern'

export type TutorialSettingsStep = 'settings-game' | 'settings-compiler' | 'settings-concurrent' | 'settings-mo2'

export type TutorialCompilationStep =
  | 'compilation-add-scripts'
  | 'compilation-compile'
  | 'compilation-create-group-from-scripts-list'

export type TutorialStep = 'welcome' | TutorialSettingsStep | TutorialCompilationStep | 'documentation' | 'end'

export type TutorialRefs = Record<
  TutorialSettingsStep | TutorialCompilationStep | 'documentation',
  RefObject<HTMLDivElement>
>

// noinspection JSUnusedLocalSymbols
const Context = createContext({
  step: none as O.Option<TutorialStep>,
  changeStep: (step: TutorialStep) => {},
  refs: {} as TutorialRefs,
  scrollInto: (ref: keyof TutorialRefs) => {},
  skip: () => {},
  total: {
    current: 0,
    end: 8,
  },
})

const SettingsTutorialProvider = ({ children }: PropsWithChildren) => {
  useConf({
    onSuccess: (data) => {
      if (!data.tutorial.settings) {
        return
      }

      setStep(some('welcome'))
    },
  })

  const [step, setStep] = useState<O.Option<TutorialStep>>(none)
  const gameRef = useRef<HTMLDivElement>(null)
  const compilerRef = useRef<HTMLDivElement>(null)
  const concurrentRef = useRef<HTMLDivElement>(null)
  const mo2Ref = useRef<HTMLDivElement>(null)
  const addScriptsRef = useRef<HTMLDivElement>(null)
  const compileRef = useRef<HTMLDivElement>(null)
  const createGroupFromScriptsListRef = useRef<HTMLDivElement>(null)
  const documentationRef = useRef<HTMLDivElement>(null)
  const updateConf = useUpdateConf()

  const refs = useMemo(
    (): TutorialRefs => ({
      'settings-game': gameRef,
      'settings-compiler': compilerRef,
      'settings-concurrent': concurrentRef,
      'settings-mo2': mo2Ref,
      'compilation-add-scripts': addScriptsRef,
      'compilation-compile': compileRef,
      'compilation-create-group-from-scripts-list': createGroupFromScriptsListRef,
      documentation: documentationRef,
    }),
    [],
  )

  const changeStep = useCallback((step: TutorialStep) => {
    setStep(some(step))
  }, [])

  const scrollInto = useCallback(
    (ref: keyof TutorialRefs) => {
      // scroll to the top of the element minus 100px with getBoundingClientRect

      const element = refs[ref].current

      if (!element) return

      const offset = 140
      const sectionTop = element.getBoundingClientRect().top
      const windowTop = window.scrollY
      const top = sectionTop + windowTop - offset

      window.scrollTo({
        top,
      })
    },
    [refs],
  )

  const skip = useCallback(() => {
    changeStep('end')
    updateConf.mutate({
      tutorial: {
        settings: false,
      },
    })
  }, [changeStep])

  const total = useMemo(() => {
    if (isNone(step)) return { current: 0, end: 8 }

    return match(step.value)
      .with('welcome', () => ({ current: 0, end: 8 }))
      .with('settings-game', () => ({ current: 1, end: 8 }))
      .with('settings-compiler', () => ({ current: 2, end: 8 }))
      .with('settings-concurrent', () => ({ current: 3, end: 8 }))
      .with('settings-mo2', () => ({ current: 4, end: 8 }))
      .with('compilation-add-scripts', () => ({ current: 5, end: 8 }))
      .with('compilation-compile', () => ({ current: 6, end: 8 }))
      .with('compilation-create-group-from-scripts-list', () => ({ current: 7, end: 8 }))
      .with('documentation', () => ({ current: 8, end: 8 }))
      .with('end', () => ({ current: 8, end: 8 }))
      .exhaustive()
  }, [step])

  return (
    <Context.Provider
      value={{
        step,
        changeStep,
        refs,
        scrollInto,
        skip,
        total,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useSettingsTutorial = () => useContext(Context)

export default SettingsTutorialProvider
