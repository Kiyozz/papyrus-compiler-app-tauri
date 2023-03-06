/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { invoke } from '@tauri-apps/api/tauri'
import { None, type Option, Result } from 'ts-results'

interface GlobOptions {
  caseSensitive: boolean
  requireLiteralSeparator: boolean
  requireLiteralLeadingDot: boolean
}

export const getLastPartOfPath = (path: string): string => path.split(/([^/]*)\/*$/)[1]

export const exists = async (path: string, extras: { from?: string } = {}): Promise<Result<boolean, Error>> =>
  await Result.wrapAsync(async () => await invoke<boolean>('path_exists', { path, ...extras }))
export const allExists = async (paths: string[], extras: { from?: string } = {}): Promise<Result<boolean, Error>> =>
  await Result.wrapAsync(async () => await invoke<boolean>('paths_exists', { paths, ...extras }))
export const isFile = async (path: string, extras: { from?: string } = {}) =>
  await Result.wrapAsync(async () => await invoke<boolean>('is_file', { path, ...extras }))

/**
 * Call Rust to retrieve paths from a glob pattern
 *
 * @param patterns
 * @param options
 * @param extras
 */
export const glob = async (
  patterns: string[],
  options: Option<GlobOptions> = None,
  extras: { from?: string } = {},
): Promise<Result<string[], Error>> => {
  return await Result.wrapAsync(
    async () =>
      await invoke<string[]>('get_scripts_in_paths', {
        patterns,
        options: options.unwrapOr(undefined),
        from: extras.from,
      }),
  )
}
