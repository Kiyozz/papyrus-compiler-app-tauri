/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { type RecentScript, type RecentScripts } from 'App/Lib/Conf/ConfZod'
import { A, S } from 'App/Lib/FpTs'
import { isRecentScriptsFileExists, readRecentScriptsFileJson } from 'App/Lib/RecentScripts/ReadRecentScriptsFile'
import { type RecentScriptsOptions } from 'App/Lib/RecentScripts/RecentScriptsOptions'
import { writeRecentScriptsFile } from 'App/Lib/RecentScripts/WriteRecentScriptsFile'
import { Ok, type Result } from 'ts-results'

const writeRecentScriptsIfNotExists = async (options: RecentScriptsOptions): Promise<Result<void, Error>> => {
  const notNeedWrite = (await isRecentScriptsFileExists(options.fileName)).unwrap()

  if (notNeedWrite) {
    return Ok(undefined)
  }

  return await writeRecentScriptsFile(options.fileName, options.defaults)
}

const defaultOptions: RecentScriptsOptions = {
  fileName: 'recent_scripts.json',
  defaults: [],
  maxItems: 20,
}

const readRecentScriptsOrUseDefaultRecentScripts = async (options: RecentScriptsOptions) =>
  await readRecentScriptsFileJson(options.fileName)

export const readRecentScripts = async () => await readRecentScriptsOrUseDefaultRecentScripts(defaultOptions)

export const writeRecentScripts = async (
  options: RecentScriptsOptions,
  { recentScripts, override = false }: { recentScripts: RecentScripts; override?: boolean },
) => {
  let recentScriptsToUse: Result<RecentScripts, Error>

  if (override) {
    recentScriptsToUse = Ok(A.takeLeft(options.maxItems)(recentScripts))
  } else {
    recentScriptsToUse = (await readRecentScripts()).map((scripts) => {
      return A.uniq(S.Eq)(A.concat(A.takeLeft(options.maxItems)(scripts))(recentScripts))
    })
  }

  if (recentScriptsToUse.err) return recentScriptsToUse

  return await writeRecentScriptsFile(options.fileName, recentScriptsToUse.val)
}

export const removeRecentScript = async (
  options: RecentScriptsOptions,
  recentScript: RecentScript,
): Promise<Result<void, Error>> => {
  const currentRecentScripts = (await readRecentScripts()).map((currentRecentScripts) =>
    currentRecentScripts.filter((currentRecentScript) => currentRecentScript !== recentScript),
  )

  if (currentRecentScripts.err) return currentRecentScripts

  return await writeRecentScriptsFile(options.fileName, currentRecentScripts.val)
}

export const removeDefaultRecentScripts = async (recentScript: RecentScript) =>
  await removeRecentScript(defaultOptions, recentScript)

export const writeDefaultRecentScripts = async ({
  recentScripts,
  override,
}: {
  recentScripts: RecentScripts
  override?: boolean
}) => await writeRecentScripts(defaultOptions, { recentScripts, override })

await writeRecentScriptsIfNotExists(defaultOptions)
