/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type FileScript } from 'App/Lib/Conf/ConfZod'

export const isFileScriptInArray = (file: FileScript, array: FileScript[]): boolean =>
  array.some((item) => item.path === file.path)
