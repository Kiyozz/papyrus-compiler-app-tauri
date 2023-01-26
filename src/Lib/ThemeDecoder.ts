/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { D } from './IoTs'

export const ThemeDecoder = D.union(D.literal('system'), D.literal('light'), D.literal('dark'))

export type Theme = D.TypeOf<typeof ThemeDecoder>
