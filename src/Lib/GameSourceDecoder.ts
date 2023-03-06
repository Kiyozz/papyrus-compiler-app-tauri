/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { z } from 'zod'

export const GameSourceDecoder = z.union([z.literal('Scripts/Source'), z.literal('Source/Scripts')])

export type GameSource = z.infer<typeof GameSourceDecoder>
