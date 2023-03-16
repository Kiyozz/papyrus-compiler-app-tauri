/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { getVersion as getVersionFromTauri } from '@tauri-apps/api/app'
import { http } from '@tauri-apps/api'
import { type Response } from '@tauri-apps/api/http'
import { type GitHubRelease } from 'App/GitHub/GitHubRelease'
import { Result } from 'ts-results'

export const getVersion = async () => await getVersionFromTauri()

export const githubRepository = 'https://api.github.com/repos/Kiyozz/papyrus-compiler-app'

export const getLatestVersion = async (): Promise<Result<Response<GitHubRelease>, Error>> => {
  return (
    await Result.wrapAsync(async () => await http.fetch<GitHubRelease>(`${githubRepository}/releases/latest`))
  ).mapErr((reason) => new Error('failed to fetch latest version', { cause: reason }))
}
