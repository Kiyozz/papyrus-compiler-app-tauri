/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type Group } from 'App/Lib/Conf/ConfZod'
import { type Id } from 'App/Type/Id'

export type GroupWithId = Group & { id: Id }
