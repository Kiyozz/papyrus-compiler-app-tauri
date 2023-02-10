/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { app, http } from '@tauri-apps/api'
import { GitHubRelease } from 'App/GitHub/GitHubRelease'
import { pipe, TE } from 'App/Lib/FpTs'
export const getVersion = () => app.getVersion()

export const githubRepository = 'https://api.github.com/repos/Kiyozz/papyrus-compiler-app'

export const getLatestVersion = () =>
  pipe(
    TE.tryCatch(
      () => http.fetch<GitHubRelease>(`${githubRepository}/releases/latest`),
      (reason) => new Error(`failed to fetch latest version, error given: ${reason}`),
    ),
  )