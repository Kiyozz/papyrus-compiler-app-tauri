/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import type { Conf } from 'App/Service/Conf/Conf'

export type ConfMigrations<T extends Record<string, any>> = Record<string, (store: Conf<T>) => Promise<void>>
