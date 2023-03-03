/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type GameSource } from 'App/Lib/GameSourceDecoder'
import { type GameType } from 'App/Lib/Conf/ConfDecoder'
import { match, P } from 'ts-pattern'

export const toOtherSource = (game: GameType): GameSource => {
  return match(game)
    .with(P.union('Skyrim LE', 'Fallout 4'), () => 'Source/Scripts' as const)
    .with(P.union('Skyrim SE', 'Skyrim VR'), () => 'Scripts/Source' as const)
    .exhaustive()
}
