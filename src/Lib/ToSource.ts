/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GameSource } from 'App/Lib/GameSourceDecoder'
import { GameType } from 'App/Lib/Conf/ConfDecoder'
import { match, P } from 'ts-pattern'

export const toSource = (game: GameType): GameSource => {
  return match(game)
    .with(P.union('Skyrim LE', 'Fallout 4'), () => 'Scripts/Source' as const)
    .with(P.union('Skyrim SE', 'Skyrim VR'), () => 'Source/Scripts' as const)
    .exhaustive()
}
