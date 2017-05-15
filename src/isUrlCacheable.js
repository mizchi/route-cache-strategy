/* @flow */
import compileCacheStrategies from './compileCacheStrategies'
import type { CompiledCacheStrategy, CacheStrategy } from './types'

// Return route is to be handled by this cache
const isUrlCacheable: (
  CompiledCacheStrategy[]
) => string => boolean = strategies => url =>
  strategies.some(st => st.compiledPattern.test(url))

export default isUrlCacheable

// Export this for client
export const isUrlCacheableOnClient: (
  CacheStrategy[]
) => string => boolean = strategies =>
  isUrlCacheable(compileCacheStrategies(strategies))
