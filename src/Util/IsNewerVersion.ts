/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import semver from 'semver'

/**
 * Compare two version strings with semver
 * @param version The version to compare
 * @param against The version to compare against
 */
export function isNewerVersion(version: string, against: string) {
  return semver.gt(version, against)
}
