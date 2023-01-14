/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { FileScript } from 'App/Lib/Conf/ConfDecoder'

export const isFileScriptInArray =
  (file: FileScript) =>
  (array: FileScript[]): boolean =>
    array.some((item) => item.path === file.path)