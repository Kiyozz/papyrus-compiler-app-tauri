/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import is from '@sindresorhus/is'
import { getVersion } from '@tauri-apps/api/app'
import { BaseDirectory, createDir, readTextFile, writeFile } from '@tauri-apps/api/fs'
import { compareVersions } from 'compare-versions'
import { FsError } from 'App/Error/FsError'
import { StoreInitializeError } from 'App/Error/StoreInitializeError'
import { StoreMigrationsError } from 'App/Error/StoreMigrationsError'

/**
 * Handle a json file with key value
 */
export class Store<T extends Record<string, unknown>> {
  public initializeCalled = false

  private readonly name: string
  private readonly store: T & { __migration__?: string }

  private get file() {
    return `${this.name}.json`
  }

  constructor({ name, default: defaultStore }: { name: string; default?: T }) {
    this.name = name

    this.store = defaultStore ?? ({} as T)
  }

  public async get<V>(key: keyof T): Promise<V | undefined> {
    return this.store[key] as V | undefined
  }

  public async set<V, K extends keyof T>(key: K, value: T[K]): Promise<void> {
    this.store[key] = value
    await this.write()
  }

  public async initialize() {
    this.initializeCalled = true

    try {
      try {
        // Create the directory if it doesn't exist
        await createDir('', { dir: BaseDirectory.App, recursive: true })
      } catch {}

      // Read the file to ensure it exists
      await this.read()
      await this.processMigrations()
    } catch {
      try {
        await this.write()
      } catch (err) {
        throw new StoreInitializeError(err)
      }
    }
  }

  private async write(): Promise<void> {
    try {
      await writeFile(
        {
          contents: JSON.stringify(
            {
              ...this.store,
              __migration__: await getVersion(),
            },
            undefined,
            2,
          ),
          path: this.file,
        },
        { dir: BaseDirectory.App },
      )
    } catch (err) {
      throw new FsError(err)
    }
  }

  private async read(): Promise<T> {
    try {
      const content = await readTextFile(this.file, { dir: BaseDirectory.App })

      return JSON.parse(content) as T
    } catch (err) {
      throw new FsError(err)
    }
  }

  private async processMigrations(): Promise<void> {
    const lastMigration = this.store.__migration__ as string

    if (is.undefined(lastMigration)) {
      return
    }

    try {
      if (compareVersions(await getVersion(), lastMigration) === 1) {
        this.store['__migration__'] = await getVersion()

        await this.write()
      }
    } catch (err) {
      throw new StoreMigrationsError(err)
    }
  }
}
