/* @flow */
import isUrlCacheable from './isUrlCacheable'
import createCacheKey from './createCacheKey'
import compileCacheStrategies from './compileCacheStrategies'
import type { CacheObject, CacheStrategy } from './types'

const defaultModifyCacheKey = (id: string) => id

export default function createCacher (
  cacheStrategies: CacheStrategy[],
  func: Function,
  cacheObject: CacheObject = new Map()
) {
  // Compile pattern with pathToRegexp at first
  const compiledCacheStrategies = compileCacheStrategies(cacheStrategies)

  const _isUrlCacheable = isUrlCacheable(compiledCacheStrategies)
  const _createCacheKey = createCacheKey(compiledCacheStrategies)
  const _getExpire = (url: string) => {
    const st = compiledCacheStrategies.find(i => i.compiledPattern.test(url))
    return st && st.expire
  }

  return async (input: { url: string }, callOpts?: { modifyCacheKey?: string => string }) => {
    const modifyCacheKey = (callOpts && callOpts.modifyCacheKey) || defaultModifyCacheKey
    let state: any
    let key
    const isCacheable = _isUrlCacheable(input.url)

    if (isCacheable) {
      const rawKey = await _createCacheKey(input.url)
      key = modifyCacheKey(rawKey)
      const cache = await cacheObject.get(key)
      if (cache) {
        state = cache
      }
    }

    if (!state) {
      // pure function
      state = await func(input)
      if (isCacheable && key) {
        const expire: any = _getExpire(input.url)
        await cacheObject.set(key, state, expire)
      }
    }
    return state
  }
}
