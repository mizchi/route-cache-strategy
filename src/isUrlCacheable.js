/* @flow */
import type { CompiledCacheStrategy } from './types'

// Return route is to be handled by this cache
const isUrlCacheable: (
  CompiledCacheStrategy[]
) => string => boolean = strategies => url =>
  strategies.some(st => st.compiledPattern.test(url))

export default isUrlCacheable
