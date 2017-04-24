/* @flow */
import pathToRegexp from 'path-to-regexp'
import type { CompiledCacheStrategy, CacheStrategy } from './types'

export default (rawStrategies: CacheStrategy[]): CompiledCacheStrategy[] => {
  return rawStrategies.map(s => ({
    ...s,
    compiledPattern: pathToRegexp(s.pattern)
  }))
}
