/* @flow */
import pathToRegexp from 'path-to-regexp'

export type CacheObject = {
  has(key: string): Promise<boolean> | boolean,
  get(key: string): Promise<string> | any,
  set(key: string, val: any): Promise<void> | void
}

export type CacheStrategy = {
  pattern: string,
  createCacheKey: (params: any) => Promise<string> | string
}

type CompiledCacheStrategy = CacheStrategy & {
  compiledPattern: RegExp
}

// pathToRegexp.exec(...)  => object
export function toParams(regexp: any) {
  const match = {}
  regexp.keys.forEach((key, n) => {
    match[key.name] = regexp[n + 1]
  })
  return match
}

export default function createCacher(cacheStrategies: CacheStrategy[], cacheObject: CacheObject) {
  // Compile pattern with pathToRegexp at first
  const compiledCacheStrategies: CompiledCacheStrategy[] = cacheStrategies.map(s => ({
    ...s,
    compiledPattern: pathToRegexp(s.pattern)
  }))

  // Return route is to be handled by this cache
  function isUrlCacheable(url: string): boolean {
    return compiledCacheStrategies.some(st => st.compiledPattern.test(url))
  }

  async function createCacheKey(url: string): Promise<string> {
    const st = compiledCacheStrategies.find(s => s.compiledPattern.test(url))
    if (st) {
      const m = st.compiledPattern.exec(url)
      if (m) {
        const params = toParams(m)
        return st.createCacheKey(params)
      }
    }
    throw new Error('createCacheKey: should not come here after isUrlCacheable')
  }

  async function loadOrUse(url: string, opts: {
    modifyCacheKey(key: string): string,
    load(): Promise<any>
  }) {
    let state
    let key
    const isCacheable = isUrlCacheable(url)

    if (isCacheable) {
      const rawKey = await createCacheKey(url)
      key = opts.modifyCacheKey(rawKey)
      const hasCache = await cacheObject.has(key)
      if (hasCache) {
        let state = await cacheObject.get(key)
      }
    }

    if (!state) {
      // pue function
      state = await opts.load(url)
      if (isCacheable && key) {
        const hasCache = await cacheObject.has(key)
        await cacheObject.set(key, state)
      }
    }

    return state
  }

  return {
    loadOrUse,
    isUrlCacheable,
    createCacheKey,
    get: cacheObject.get.bind(cacheObject),
    set: cacheObject.set.bind(cacheObject),
    has: cacheObject.has.bind(cacheObject)
  }
}
