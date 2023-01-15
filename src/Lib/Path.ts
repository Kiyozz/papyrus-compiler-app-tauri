/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */
import { invoke } from '@tauri-apps/api/tauri'

export const getLastPartOfPath = (path: string): string => path.split(/([^\/]*)\/*$/)[1]

export const exists = (path: string, extras: { from?: string } = {}) =>
  invoke<boolean>('path_exists', { path, ...extras })
