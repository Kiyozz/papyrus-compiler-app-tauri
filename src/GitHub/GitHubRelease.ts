/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

export type GitHubRelease = {
  url: string
  assets_url: string
  upload_url: string
  html_url: string
  id: number
  node_id: string
  tag_name: string
  target_commitish: string
  name: string
  draft: boolean
  prerelease: boolean
  created_at: string
  published_at: string
  assets: {
    url: string
    name: string
    size: number
    created_at: string
    updated_at: string
    browser_download_url: string
  }[]
  tarball_url: string
  zipball_url: string
  body: string
}
