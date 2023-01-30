/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { invoke } from '@tauri-apps/api/tauri'
import { O } from './FpTs'

export const getLastPartOfPath = (path: string): string => path.split(/([^\/]*)\/*$/)[1]

export const exists = (path: string, extras: { from?: string } = {}) =>
  invoke<boolean>('path_exists', { path, ...extras })
export const allExists = (paths: string[], extras: { from?: string } = {}) =>
  invoke<boolean>('paths_exists', { paths, ...extras })

type GlobOptions = {
  caseSensitive: boolean
  requireLiteralSeparator: boolean
  requireLiteralLeadingDot: boolean
}

/**
 * Call Rust to retrieve paths from a glob pattern
 *
 * @param patterns
 * @param options
 * @param extras
 */
export const glob = (patterns: string[], options: O.Option<GlobOptions> = O.none, extras: { from?: string } = {}) => {
  return invoke<string[]>('get_scripts_in_paths', {
    patterns,
    options: O.toUndefined(options),
    from: extras.from,
  }).catch((err) => {
    console.log(err)

    throw err
  })
}
