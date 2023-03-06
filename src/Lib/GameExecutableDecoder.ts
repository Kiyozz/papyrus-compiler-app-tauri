/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { z } from 'zod'

export const GameExecutableDecoder = z.union([
  z.literal('SkyrimSE.exe'),
  z.literal('TESV.exe'),
  z.literal('SkyrimVR.exe'),
  z.literal('Fallout4.exe'),
])

export type GameExecutable = z.infer<typeof GameExecutableDecoder>
