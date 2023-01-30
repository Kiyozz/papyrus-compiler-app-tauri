/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { D } from '../IoTs'

export const EnvironmentDecoder = D.union(D.literal('release'), D.literal('debug'))

export type Environment = D.TypeOf<typeof EnvironmentDecoder>
