/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type GameSource } from 'App/Lib/GameSourceDecoder'
import { type GameType } from 'App/Lib/Conf/ConfZod'
import { match, P } from 'ts-pattern'

export const toSource = (game: GameType): GameSource => {
  return match(game)
    .with(P.union('Skyrim LE', 'Fallout 4'), () => 'Scripts/Source' as const)
    .with(P.union('Skyrim SE/AE', 'Skyrim VR'), () => 'Source/Scripts' as const)
    .exhaustive()
}
