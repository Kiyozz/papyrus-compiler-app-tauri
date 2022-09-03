/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GitHubRelease } from 'App/GitHub/GitHubRelease'
import { GitHubReleaseInterface } from 'App/GitHub/GitHubReleaseInterface'
import ky from 'ky'

export class GitHub {
  constructor(private readonly repository: string) {}

  /**
   * Get the latest GitHub release of `this.repository`
   */
  async getLatestRelease(): Promise<GitHubRelease> {
    const [release] = await ky.get(`${this.repository}/releases?per_page=1`).json<GitHubReleaseInterface[]>()

    return GitHubRelease.fromJson(release)
  }
}
