/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { type TranslationSchema } from 'App/Type/TranslationSchema'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import fr from './fr'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      fr: TranslationSchema
      en: TranslationSchema
    }
  }
}

export async function configureTranslations() {
  return await i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        fr: {
          translation: fr,
        },
        en: {
          translation: fr,
        },
      },
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    })
}
