/* @flow */
import pathToRegexp from 'path-to-regexp'
import isUrlCacheable from './isUrlCacheable'
import createCacheKey from './createCacheKey'
import compileCacheStrategies from './compileCacheStrategies'
import type { CacheObject, CacheStrategy, CompiledCacheStrategy, LoadOrUseOption } from './types'

export default function createCacher (cacheStrategies: CacheStrategy[], cacheObject: CacheObject) {
  // Compile pattern with pathToRegexp at first
  const compiledCacheStrategies = compileCacheStrategies(cacheStrategies)

  const _isUrlCacheable = isUrlCacheable(compiledCacheStrategies)
  const _createCacheKey = createCacheKey(compiledCacheStrategies)

  return async (url: string, opts: LoadOrUseOption) => {
    let state
    let key
    const isCacheable = _isUrlCacheable(url)

    if (isCacheable) {
      const rawKey = await _createCacheKey(url)
      key = opts.modifyCacheKey(rawKey)
      const hasCache = await cacheObject.has(key)
      if (hasCache) {
        state = await cacheObject.get(key)
      }
    }

    if (!state) {
      // pure function
      state = await opts.load(url)
      if (isCacheable && key) {
        await cacheObject.set(key, state)
      }
    }
    return state
  }
}
