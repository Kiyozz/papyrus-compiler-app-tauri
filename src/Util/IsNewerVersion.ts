/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import { compare } from 'compare-versions'

/**
 * Compare two version strings with compare-versions
 * @param version The version to compare
 * @param against The version to compare against
 */
export function isNewerVersion(version: string, against: string) {
  return compare(version, against, '>')
}
