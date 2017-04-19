/* @flow */
import pathToRegexp from 'path-to-regexp'

import type { CacheObject, CacheStrategy, CompiledCacheStrategy, LoadOrUseOption } from './types'

// pathToRegexp.exec(...)  => object
export function toParams(regexp: any) {
  const match = {}
  regexp.keys.forEach((key, n) => {
    match[key.name] = regexp[n + 1]
  })
  return match
}

// Return route is to be handled by this cache
export const isUrlCacheable: CompiledCacheStrategy[] => string => boolean
  = strategies => url => strategies.some(st => st.compiledPattern.test(url))

export const createCacheKey: CompiledCacheStrategy[] => string => Promise<string>
  = strategies => async url => {
    const st = strategies.find(s => s.compiledPattern.test(url))
    if (st) {
      const m = st.compiledPattern.exec(url)
      if (m) {
        const params = toParams(m)
        return st.createCacheKey(params)
      }
    }
    throw new Error('createCacheKey: should not come here after isUrlCacheable')
  }

export default function createCacher(cacheStrategies: CacheStrategy[], cacheObject: CacheObject) {
  // Compile pattern with pathToRegexp at first
  const compiledCacheStrategies: CompiledCacheStrategy[] = cacheStrategies.map(s => ({
    ...s,
    compiledPattern: pathToRegexp(s.pattern)
  }))

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
        let state = await cacheObject.get(key)
      }
    }

    if (!state) {
      // pure function
      state = await opts.load(url)
      if (isCacheable && key) {
        const hasCache = await cacheObject.has(key)
        await cacheObject.set(key, state)
      }
    }
    return state
  }
}
