/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { z } from 'zod'

export const ThemeDecoder = z.union([z.literal('system'), z.literal('light'), z.literal('dark')])

export type Theme = z.infer<typeof ThemeDecoder>
