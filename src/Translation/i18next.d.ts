/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import type { resources } from './ConfigureTranslations'

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      translation: typeof resources['fr']['translation']
    }
  }
}
