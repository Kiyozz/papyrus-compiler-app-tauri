/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type GameExecutable } from 'App/Lib/GameExecutableDecoder'
import { type GameType } from 'App/Lib/Conf/ConfDecoder'
import { match } from 'ts-pattern'

export const toExecutable = (game: GameType): GameExecutable =>
  match(game)
    .with('Skyrim LE', () => 'TESV.exe' as const)
    .with('Skyrim SE', () => 'SkyrimSE.exe' as const)
    .with('Skyrim VR', () => 'SkyrimVR.exe' as const)
    .with('Fallout 4', () => 'Fallout4.exe' as const)
    .exhaustive()
