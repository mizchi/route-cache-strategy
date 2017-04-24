/* @flow */
import pathToRegexp from 'path-to-regexp'
import isUrlCacheable from './isUrlCacheable'
import createCacheKey from './createCacheKey'
import compileCacheStrategies from './compileCacheStrategies'
import type { CacheObject, CacheStrategy, CompiledCacheStrategy, CacherOption, CacherAPI } from './types'

const defaultModifyCacheKey = (id: string) => id

export default function createCacher (
  cacheStrategies: CacheStrategy[],
  opts: CacherOption,
  cacheObject: CacheObject = new Map
) {
  // Compile pattern with pathToRegexp at first
  const compiledCacheStrategies = compileCacheStrategies(cacheStrategies)

  const _isUrlCacheable = isUrlCacheable(compiledCacheStrategies)
  const _createCacheKey = createCacheKey(compiledCacheStrategies)

  const newOpts: CacherAPI = {
    modifyCacheKey: opts.modifyCacheKey || defaultModifyCacheKey,
    load: opts.load
  }

  return async (input: { url: string }) => {
    let state: any
    let key
    const isCacheable = _isUrlCacheable(input.url)

    if (isCacheable) {
      const rawKey = await _createCacheKey(input.url)
      key = newOpts.modifyCacheKey(rawKey)
      const hasCache = await cacheObject.has(key)
      if (hasCache) {
        state = await cacheObject.get(key)
      }
    }

    if (!state) {
      // pure function
      state = await newOpts.load(input)
      if (isCacheable && key) {
        await cacheObject.set(key, state)
      }
    }
    return state
  }
}
