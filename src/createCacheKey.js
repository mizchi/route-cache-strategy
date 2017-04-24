/* @flow */
import { CompiledCacheStrategy } from './types'
import toParams from './toParams'

const createCacheKey: CompiledCacheStrategy[] => string => Promise<string> =
  strategies => async url => {
    const st = strategies.find(s => s.compiledPattern.test(url))
    if (st) {
      const m = st.compiledPattern.exec(url)
      if (m) {
        const params = toParams(st.compiledPattern, m)
        return st.createCacheKey(params)
      }
    }
    throw new Error('createCacheKey: should not come here after isUrlCacheable')
  }

export default createCacheKey
