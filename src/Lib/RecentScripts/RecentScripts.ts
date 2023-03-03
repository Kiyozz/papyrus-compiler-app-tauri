/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type RecentScript, type RecentScripts } from 'App/Lib/Conf/ConfDecoder'
import { A, pipe, S, TE, TO } from 'App/Lib/FpTs'
import { canReadRecentScriptsFile, readRecentScriptsFileJson } from 'App/Lib/RecentScripts/ReadRecentScriptsFile'
import { type RecentScriptsOptions } from 'App/Lib/RecentScripts/RecentScriptsOptions'
import { writeRecentScriptsFile } from 'App/Lib/RecentScripts/WriteRecentScriptsFile'

const writeRecentScriptsIfNotExists = (options: RecentScriptsOptions) =>
  pipe(
    canReadRecentScriptsFile(options.fileName),
    TE.fromTask,
    TE.filterOrElse(
      (canReadGroups) => !canReadGroups,
      () => new Error('Groups file already exists'),
    ),
    TE.chain(() => writeRecentScriptsFile(options.fileName)(options.defaults)),
    TO.fromTaskEither,
  )

const defaultOptions: RecentScriptsOptions = {
  fileName: 'recent_scripts.json',
  defaults: [],
  maxItems: 20,
}

const readRecentScriptsOrUseDefaultRecentScripts = (options: RecentScriptsOptions) =>
  readRecentScriptsFileJson(options.fileName)

export const readRecentScripts = readRecentScriptsOrUseDefaultRecentScripts(defaultOptions)

export const writeRecentScripts =
  (options: RecentScriptsOptions) =>
  ({ recentScripts, override = false }: { recentScripts: RecentScripts; override?: boolean }) =>
    pipe(
      readRecentScripts,
      TE.map((currentRecentScripts) => {
        if (override) {
          return A.takeLeft(options.maxItems)(recentScripts)
        }

        return pipe(recentScripts, A.concat(A.takeLeft(options.maxItems)(currentRecentScripts)), A.uniq(S.Eq))
      }),
      TE.chain(writeRecentScriptsFile(options.fileName)),
    )

export const removeRecentScript = (options: RecentScriptsOptions) => (recentScript: RecentScript) =>
  pipe(
    readRecentScripts,
    TE.map((currentRecentScripts) =>
      pipe(
        currentRecentScripts,
        A.filter((currentRecentScript) => currentRecentScript !== recentScript),
      ),
    ),
    TE.chain(writeRecentScriptsFile(options.fileName)),
  )

export const removeDefaultRecentScripts = removeRecentScript(defaultOptions)

export const writeDefaultRecentScripts = writeRecentScripts(defaultOptions)

await writeRecentScriptsIfNotExists(defaultOptions)()
