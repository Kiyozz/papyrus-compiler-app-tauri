/*
 * Copyright (c) 2022 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

import is from '@sindresorhus/is'
import { BaseDirectory, createDir, readTextFile, writeTextFile } from '@tauri-apps/api/fs'
import Ajv, { ValidateFunction as AjvValidateFunction } from 'ajv'
import ajvFormats from 'ajv-formats'
import { ConfMigrations } from 'App/Service/Conf/ConfMigrations'
import { ConfOptions } from 'App/Service/Conf/ConfOptions'
import deepEqual from 'deep-equal'
import { deepKeys, deleteProperty, getProperty, hasProperty, setProperty } from 'dot-prop'
import { JSONSchema } from 'json-schema-typed'
import semver from 'semver'
import { PartialObjectDeep } from 'type-fest/source/partial-deep'

const MIGRATION_KEY = 'migrations'

class Emitter<T> {
  constructor() {}

  private listeners: Set<(value: T) => void> = new Set()

  public on(listener: (value: T) => void) {
    this.listeners.add(listener)
  }

  public off(listener: (value: T) => void) {
    this.listeners.delete(listener)
  }

  public emit(value: T) {
    for (const listener of this.listeners) {
      listener(value)
    }
  }
}

export class Conf<T extends Record<string, any> = Record<string, unknown>>
  implements AsyncIterable<[keyof T, T[keyof T]]>
{
  initialized = false

  readonly #validator?: AjvValidateFunction
  readonly #options: Readonly<ConfOptions<T>>
  readonly #defaultValues: Partial<T> = {}
  readonly #serialize: Required<ConfOptions<T>>['serialize']
  readonly #deserialize: Required<ConfOptions<T>>['deserialize']
  readonly #onChangeEmitter = new Emitter<T>()

  get store(): Promise<T> {
    // this.#ensureInitialized()

    return readTextFile(`${this.#options.configName}.json`, { dir: BaseDirectory.App }).then((text) => JSON.parse(text))
  }

  set store(value: Promise<T>) {
    // this.#ensureInitialized()

    value
      .then((store) => {
        return this.#ensureDirectory().then(() => store)
      })
      .then(async (store) => {
        this.#validate(store)

        await this.#write(store)

        this.#onChangeEmitter.emit(store)

        return store
      })
  }

  get size(): Promise<number> {
    return this.store.then((store) => {
      return Object.keys(store).length
    })
  }

  constructor(partialOptions: Readonly<Partial<ConfOptions<T>>>, whenInitialized?: () => void) {
    const deserialize = partialOptions.deserialize ?? JSON.parse
    const serialize = partialOptions.serialize ?? ((data) => JSON.stringify(data, undefined, '\t'))

    const options: ConfOptions<T> = {
      configName: 'config',
      deserialize,
      serialize,
      projectVersion: '0.0.0',
      ...partialOptions,
    }

    this.#serialize = serialize
    this.#deserialize = deserialize

    this.#options = options

    if (options.schema) {
      if (typeof options.schema !== 'object') {
        throw new TypeError('The `schema` option must be an object.')
      }

      const ajv = new Ajv({
        allErrors: true,
        useDefaults: true,
      })

      ajvFormats(ajv)

      const schema: JSONSchema = {
        type: 'object',
        properties: options.schema,
      }

      this.#validator = ajv.compile(schema)

      for (const [key, value] of Object.entries<JSONSchema>(options.schema)) {
        if ((value as { default: unknown }).default !== undefined) {
          this.#defaultValues[key as keyof T] = (value as { default: unknown }).default as T[keyof T]
        }
      }

      this.#defaultValues = {
        ...this.#defaultValues,
        ...options.defaults,
      }

      this.#ensureDirectory()
        .then(() => {
          this.store.then(async (fileStore) => {
            const store = {
              ...options.defaults,
              ...fileStore,
            }

            this.#validate(store)

            if (!deepEqual(fileStore, store)) {
              this.store = Promise.resolve(store)
            }

            if (options.migrations) {
              if (!options.projectVersion) {
                throw new Error('Project version required for migrations')
              }

              this.#migrate(options.migrations, options.projectVersion).catch((err) => {
                throw err
              })
            }

            this.initialized = true
            whenInitialized?.()
          })
        })
        .catch((err) => {
          console.error(err)
          throw err
        })
    }
  }

  [Symbol.asyncIterator](): AsyncIterator<[keyof T, T[keyof T]]> {
    const initialStore = this.store

    return {
      async next() {
        const store = await initialStore
        const keys = Object.keys(store)
        const key = keys.shift()

        if (key) {
          return {
            done: false,
            value: [key as keyof T, store[key as keyof T]],
          }
        }

        return {
          done: true,
          value: undefined,
        }
      },
    } as AsyncIterator<[keyof T, T[keyof T]]>
  }

  #validate(data: T | unknown) {
    if (!this.#validator) {
      return
    }

    const valid = this.#validator(data)

    if (valid || !this.#validator.errors) {
      return
    }

    const errors = this.#validator.errors.map(({ instancePath, message = '' }) => {
      return `\`${instancePath.slice(1)}\` ${message}`
    })

    throw new Error(`Config schema violation: ${errors.join(', ')}`)
  }

  async #migrate(migrations: ConfMigrations<T>, projectVersion: string) {
    let previousVersion = await this.get(MIGRATION_KEY, '0.0.0')

    const newerVersions = Object.keys(migrations).filter((version) => {
      return this.#shouldPerformMigration(version, previousVersion, projectVersion)
    })

    let storeBackup = { ...(await this.store) }

    for (const version of newerVersions) {
      try {
        const migration = migrations[version]

        await migration(this)
        await this.set(MIGRATION_KEY, version as T[typeof MIGRATION_KEY])

        storeBackup = { ...(await this.store) }
        previousVersion = version
      } catch (err) {
        this.store = Promise.resolve(storeBackup)

        throw new Error(`Migration failed: ${err as string}`)
      }
    }
  }

  #shouldPerformMigration(
    candidateVersion: string,
    previousMigratedVersion: string,
    versionToMigrate: string,
  ): boolean {
    if (semver.clean(candidateVersion) === null) {
      if (previousMigratedVersion !== '0.0.0' && semver.satisfies(previousMigratedVersion, candidateVersion)) {
        return false
      }

      return semver.satisfies(versionToMigrate, candidateVersion)
    }

    if (semver.lte(candidateVersion, previousMigratedVersion)) {
      return false
    }

    return !semver.gt(candidateVersion, versionToMigrate)
  }

  #containsReservedKey(key: string): boolean {
    return key === MIGRATION_KEY
  }

  async get<Key extends keyof T>(key: Key): Promise<T[Key] | undefined>
  async get<Key extends keyof T, Default = unknown>(key: Key, defaultValue: Default): Promise<T[Key] | Default>
  async get<Key extends keyof T, Default = unknown>(
    key: Key | string,
    defaultValue?: Default,
  ): Promise<Default | undefined> {
    return getProperty(await this.store, key as string, defaultValue as T[Key])
  }

  async set<Key extends keyof T>(key: Key, value?: T[Key]): Promise<void>
  async set(key: string, value: unknown): Promise<void>
  async set(object: PartialObjectDeep<T, {}>): Promise<void>
  async set<Key extends keyof T>(key: Partial<T> | Key | string, value?: unknown): Promise<void> {
    if (!is.string(key) && !is.object(key)) {
      throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${is(key)}`)
    }

    if (!is.object(key) && value === undefined) {
      throw new TypeError(`Use \`delete()\` to clear values`)
    }

    if (this.#containsReservedKey(key as string)) {
      throw new Error(`Please don't use the ${MIGRATION_KEY} key, as it's used to manage migrations.`)
    }

    const store = await this.store

    if (is.object(key)) {
      for (const deepKey of deepKeys(key)) {
        setProperty(store, deepKey, getProperty(key, deepKey))
      }
    } else {
      setProperty(store, key as string, value as T[Key])
    }

    this.store = Promise.resolve(store)
  }

  async has<Key extends keyof T>(key: Key | string): Promise<boolean> {
    return hasProperty(await this.store, key as string)
  }

  async reset<Key extends keyof T>(...keys: Key[]): Promise<void> {
    for (const key of keys) {
      const value = this.#defaultValues[key]

      if (!is.undefined(value) && !is.null_(value)) {
        await this.set(key, value)
      }
    }
  }

  async delete<Key extends keyof T>(key: Key): Promise<void> {
    const store = await this.store

    deleteProperty(store, key as string)

    this.store = Promise.resolve(store)
  }

  async #ensureDirectory(): Promise<void> {
    try {
      // Create the directory if it doesn't exist
      await createDir('', { dir: BaseDirectory.App, recursive: true })
      await this.#ensureFile()
    } catch {}
  }

  async #ensureFile(): Promise<void> {
    try {
      try {
        await readTextFile(`${this.#options.configName}.json`, { dir: BaseDirectory.App })
      } catch {
        // Create the directory if it doesn't exist
        await writeTextFile(
          {
            path: `${this.#options.configName}.json`,
            contents: this.#serialize(this.#defaultValues as T),
          },
          { dir: BaseDirectory.App },
        )
      }
    } catch {}
  }

  async #write(value: T): Promise<void> {
    let data = this.#serialize(value)

    await writeTextFile(
      {
        path: `${this.#options.configName}.json`,
        contents: data,
      },
      { dir: BaseDirectory.App },
    )
  }

  on(evt: 'change', fn: (store: T) => void): void {
    this.#onChangeEmitter.on(fn)
  }

  off(evt: 'change', fn: (store: T) => void): void {
    this.#onChangeEmitter.off(fn)
  }
}
