/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { pipe } from 'App/Lib/FpTs'
import { D } from 'App/Lib/IoTs'
import { Id } from 'App/Type/Id'
import { Decoder } from 'io-ts/Decoder'

export const MiscDecoder = D.struct({
  drawerOpen: D.boolean,
  documentation: D.struct({
    reminder: D.boolean,
  }),
})
export type Misc = D.TypeOf<typeof MiscDecoder>

export const FileScriptDecoder = D.struct({
  id: D.string,
  name: D.string,
  path: D.string,
})

export type FileScript = D.TypeOf<typeof FileScriptDecoder>

export const GroupDecoder = D.struct({
  name: D.string,
  scripts: D.array(FileScriptDecoder),
})

export type Group = D.TypeOf<typeof GroupDecoder>

// Record key is the group id uuid
export const GroupsDecoder = D.record(GroupDecoder) satisfies Decoder<unknown, Record<Id, Group>>

export type Groups = D.TypeOf<typeof GroupsDecoder>

export const RecentScriptDecoder = D.string

export type RecentScript = D.TypeOf<typeof RecentScriptDecoder>

export const RecentScriptsDecoder = D.array(D.string)

export type RecentScripts = D.TypeOf<typeof RecentScriptsDecoder>

export const FlagDecoder = D.union(D.literal('TESV_Papyrus_Flags.flg'), D.literal('Institute_Papyrus_Flags.flg'))
export type Flag = D.TypeOf<typeof FlagDecoder>

export const GameTypeDecoder = D.union(
  D.literal('Skyrim LE'),
  D.literal('Skyrim SE'),
  D.literal('Skyrim VR'),
  D.literal('Fallout 4'),
)
export type GameType = D.TypeOf<typeof GameTypeDecoder>

export const ThemeDecoder = D.union(D.literal('system'), D.literal('light'), D.literal('dark'))
export type Theme = D.TypeOf<typeof ThemeDecoder>

export const LocaleDecoder = D.union(D.literal('en'), D.literal('fr'))
export type Locale = D.TypeOf<typeof LocaleDecoder>

export const Mo2Decoder = pipe(
  D.struct({
    use: D.boolean,
    output: D.string,
    modsFolderRelativeToInstance: D.string,
  }),
  D.intersect(
    D.partial({
      instance: D.string, // decoder filesystem path
    }),
  ),
)
export type Mo2 = D.TypeOf<typeof Mo2Decoder>

export const TutorialDecoder = D.struct({
  telemetry: D.boolean,
  settings: D.boolean,
})
export type Tutorial = D.TypeOf<typeof TutorialDecoder>

export const CompilationDecoder = D.struct({
  compilerPath: D.string,
  flag: FlagDecoder,
  concurrentScripts: D.number,
  output: D.string,
})
export type Compilation = D.TypeOf<typeof CompilationDecoder>

export const GameDecoder = D.struct({
  type: GameTypeDecoder,
  path: D.string,
})
export type Game = D.TypeOf<typeof GameDecoder>

const TelemetryDecoder = D.struct({
  use: D.boolean,
})
export type Telemetry = D.TypeOf<typeof TelemetryDecoder>

export const ConfDecoder = D.struct({
  game: GameDecoder,
  compilation: CompilationDecoder,
  tutorial: TutorialDecoder,
  mo2: Mo2Decoder,
  telemetry: TelemetryDecoder,
  theme: ThemeDecoder,
  locale: LocaleDecoder,
  misc: MiscDecoder,
})

export type Conf = D.TypeOf<typeof ConfDecoder>
