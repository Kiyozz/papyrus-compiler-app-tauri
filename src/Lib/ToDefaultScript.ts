/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GameType } from 'App/Lib/Conf/ConfDecoder'

export type DefaultScript = 'Base/Actor.psc' | 'Actor.psc'

export const toDefaultScript = (game: GameType): DefaultScript => {
  switch (game) {
    case 'Fallout 4':
      return 'Base/Actor.psc'
    default:
      return 'Actor.psc'
  }
}
