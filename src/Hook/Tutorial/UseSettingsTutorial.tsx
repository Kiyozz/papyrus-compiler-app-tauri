/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { useConf } from 'App/Hook/Conf/UseConf'
import { useUpdateConf } from 'App/Hook/Conf/UseUpdateConf'
import { useMatomo } from 'App/Hook/UseMatomo'
import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useState,
  type RefObject,
  useRef,
  useMemo,
} from 'react'
import { match } from 'ts-pattern'
import { None, type Option, Some } from 'ts-results'

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
  step: None as Option<TutorialStep>,
  changeStep: (step: TutorialStep) => {},
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  refs: {} as TutorialRefs,
  scrollInto: (ref: keyof TutorialRefs) => {},
  skip: (reason: 'skip' | 'skipKey' | 'end' | 'deny') => {},
  total: {
    current: 0,
    end: 8,
  },
})

const SettingsTutorialProvider = ({ children }: PropsWithChildren) => {
  const conf = useConf()

  const { trackEvent } = useMatomo()

  const [step, setStep] = useState<Option<TutorialStep>>(
    conf.data?.tutorial.settings === true ? Some('welcome' as const) : Some('end' as const),
  )
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

  const changeStep = useCallback(
    (step: TutorialStep) => {
      setStep(Some(step))
      trackEvent({
        category: 'Settings tutorial',
        action: 'Change step',
        name: step,
      })
    },
    [trackEvent],
  )

  const scrollInto = useCallback(
    (ref: keyof TutorialRefs) => {
      // scroll to the top of the element minus 140px with getBoundingClientRect

      const element = refs[ref].current

      if (element === null) return

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

  const skip = useCallback(
    (reason: 'skip' | 'skipKey' | 'end' | 'deny') => {
      changeStep('end')
      updateConf.mutate({
        tutorial: {
          settings: false,
        },
      })

      if (step.some) {
        trackEvent({
          category: 'Settings tutorial',
          action: 'Skip',
          name: reason,
        })
      }
    },
    [changeStep, step, trackEvent, updateConf],
  )

  const total = useMemo(() => {
    if (step.none) return { current: 0, end: 8 }

    return match(step.val)
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
