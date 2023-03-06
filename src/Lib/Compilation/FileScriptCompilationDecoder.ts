/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { FileScriptZod } from 'App/Lib/Conf/ConfZod'
import { z } from 'zod'

export const FileScriptCompilationDecoder = z.intersection(
  FileScriptZod,
  z.object({
    status: z.union([z.literal('idle'), z.literal('running'), z.literal('done'), z.literal('error')]),
  }),
)

export type FileScriptCompilation = z.infer<typeof FileScriptCompilationDecoder>
