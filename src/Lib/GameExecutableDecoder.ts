/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { D } from './IoTs'

export const GameExecutableDecoder = D.union(
  D.literal('SkyrimSE.exe'),
  D.literal('TESV.exe'),
  D.literal('SkyrimVR.exe'),
  D.literal('Fallout4.exe'),
)

export type GameExecutable = D.TypeOf<typeof GameExecutableDecoder>
