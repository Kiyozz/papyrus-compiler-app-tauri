/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { Environment } from 'App/Lib/Environment/Environment'

export const isProduction = (environment: Environment) => environment === 'release'
