/* @flow */
import toParams from './toParams'
import type { CompiledCacheStrategy } from './types'

const createCacheKey: (
  CompiledCacheStrategy[]
) => string => Promise<string> = strategies => async url => {
  const st = strategies.find(s => s.compiledPattern.test(url))
  if (st) {
    const params = toParams(st.compiledPattern, url)
    return st.createCacheKey(params)
  }
  throw new Error('createCacheKey: should not come here after isUrlCacheable')
}

export default createCacheKey
