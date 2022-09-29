/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import is from '@sindresorhus/is'
import { getVersion } from '@tauri-apps/api/app'
import { BaseDirectory, createDir, readTextFile, writeFile } from '@tauri-apps/api/fs'
import { ValidationError } from 'App/Error/ValidationError'
import semver from 'semver'
import { FsError } from 'App/Error/FsError'
import { StoreInitializeError } from 'App/Error/StoreInitializeError'
import { StoreMigrationsError } from 'App/Error/StoreMigrationsError'

/**
 * Handle a json file with key value
 */
export class Store<T extends Record<string, unknown>> {
  public initializeCalled = false

  private readonly name: string
  private readonly validation: (store: T) => Promise<boolean>
  private store: T & { __migration__?: string }

  private get file() {
    return `${this.name}.json`
  }

  constructor({
    name,
    default: defaultStore,
    validation,
  }: {
    name: string
    default?: T
    validation: (store: T) => Promise<boolean>
  }) {
    this.name = name
    this.validation = validation

    this.store = defaultStore ?? ({} as T)
  }

  public get<V extends keyof T>(key: V): T[V] {
    return this.store[key] as T[V]
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

      // Read the file to ensure it exists and store it
      this.store = await this.read()
      await this.validate()

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
      if (semver.gt(await getVersion(), lastMigration)) {
        this.store['__migration__'] = await getVersion()

        await this.write()
      }
    } catch (err) {
      throw new StoreMigrationsError(err)
    }
  }

  private async validate(): Promise<void> {
    const isValid = await this.validation(this.store)

    if (!isValid) {
      throw new ValidationError(this.store)
    }
  }
}
