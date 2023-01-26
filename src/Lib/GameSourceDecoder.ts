/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { D } from './IoTs'

export const GameSourceDecoder = D.union(D.literal('Scripts/Source'), D.literal('Source/Scripts'))

export type GameSource = D.TypeOf<typeof GameSourceDecoder>
