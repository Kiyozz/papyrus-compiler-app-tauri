/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

export const getLastPartOfPath = (path: string): string => path.split(/([^\/]*)\/*$/)[1]
