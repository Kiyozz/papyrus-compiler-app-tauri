/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { GitHubReleaseInterface } from 'App/GitHub/GitHubReleaseInterface'

export class GitHubRelease {
  constructor(public readonly id: number, public readonly tagName: string, public readonly body: string) {}

  static fromJson(json: GitHubReleaseInterface): GitHubRelease {
    return new GitHubRelease(json.id, json.tag_name, json.body)
  }
}
