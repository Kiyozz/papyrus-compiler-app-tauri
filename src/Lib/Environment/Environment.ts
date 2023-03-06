/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { z } from 'zod'

export const EnvironmentDecoder = z.union([z.literal('release'), z.literal('debug')])

export type Environment = z.infer<typeof EnvironmentDecoder>
