/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { z } from 'zod'

export const MiscZod = z.object({
  drawerOpen: z.boolean(),
  documentation: z.object({
    reminder: z.boolean(),
  }),
})

export const FileScriptZod = z.object({
  id: z.string(),
  name: z.string(),
  path: z.string(), // TODO: zod filesystem path
})

export type FileScript = z.infer<typeof FileScriptZod>

export const GroupZod = z.object({
  name: z.string(),
  scripts: z.array(FileScriptZod),
})

export type Group = z.infer<typeof GroupZod>

// Record key is the group id uuid
export const GroupsZod = z.record(GroupZod)

export type Groups = z.infer<typeof GroupsZod>

export const RecentScriptZod = z.string()

export type RecentScript = z.infer<typeof RecentScriptZod>

export const RecentScriptsZod = z.array(z.string())

export type RecentScripts = z.infer<typeof RecentScriptsZod>

export const FlagZod = z.union([z.literal('TESV_Papyrus_Flags.flg'), z.literal('Institute_Papyrus_Flags.flg')])

export type Flag = z.infer<typeof FlagZod>

export const GameTypeZod = z.union([
  z.literal('Skyrim LE'),
  z.literal('Skyrim SE/AE'),
  z.literal('Skyrim VR'),
  z.literal('Fallout 4'),
])
export type GameType = z.infer<typeof GameTypeZod>

export const ThemeZod = z.union([z.literal('system'), z.literal('light'), z.literal('dark')])
export type Theme = z.infer<typeof ThemeZod>

export const LocaleZod = z.union([z.literal('en'), z.literal('fr')])
export type Locale = z.infer<typeof LocaleZod>

export const Mo2Zod = z.object({
  use: z.boolean(),
  output: z.string(),
  modsFolderRelativeToInstance: z.string(),
  instance: z.string().optional(), // TODO: zod filesystem path
})

export const TutorialZod = z.object({
  settings: z.boolean(),
  telemetry: z.boolean(),
})
export type Tutorial = z.infer<typeof TutorialZod>

export const CompilationZod = z.object({
  compilerPath: z.string(),
  flag: FlagZod,
  concurrentScripts: z.number(),
  output: z.string(),
})
export type Compilation = z.infer<typeof CompilationZod>

export const GameZod = z.object({
  type: GameTypeZod,
  path: z.string(),
})
export type Game = z.infer<typeof GameZod>

const TelemetryZod = z.object({
  use: z.boolean(),
})
export type Telemetry = z.infer<typeof TelemetryZod>

const LogLevelZod = z.union([
  z.literal('trace'),
  z.literal('debug'),
  z.literal('info'),
  z.literal('warn'),
  z.literal('error'),
])

export type LogLevel = z.infer<typeof LogLevelZod>

export const ConfZod = z.object({
  game: GameZod,
  compilation: CompilationZod,
  tutorial: TutorialZod,
  mo2: Mo2Zod,
  telemetry: TelemetryZod,
  theme: ThemeZod,
  locale: LocaleZod,
  misc: MiscZod,
  logLevel: LogLevelZod,
})

export type Conf = z.infer<typeof ConfZod>
