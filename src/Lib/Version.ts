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
import { Err, Ok, Result } from 'ts-results'

export const getVersion = async () => await getVersionFromTauri()

export const githubRepository = 'https://api.github.com/repos/Kiyozz/papyrus-compiler-app'

export const getLatestVersion = async (): Promise<Result<Response<GitHubRelease>, Error>> => {
  return (await Result.wrapAsync(async () => await http.fetch<GitHubRelease>(`${githubRepository}/releases/latest`)))
    .mapErr((reason) => new Error('failed to fetch latest version', { cause: reason }))
    .andThen((res) => {
      if (!res.ok) {
        return Err(
          new Error(
            `failed to fetch latest version: ${
              'message' in res.data && typeof res.data.message === 'string' ? res.data.message : 'unknown message'
            }`,
            {
              cause: new Error(`status code: ${res.status}`),
            },
          ),
        )
      }

      return Ok(res)
    })
}
