/* @flow */
import type {CacheStrategy, LoadOrUseOption, Middleware} from './types'
import createCacher from './index'

export default (
  strategies: CacheStrategy[],
  storage: any,
  opts: LoadOrUseOption
): Middleware => {
  const cacher = createCacher(strategies, storage)

  return async (req, res, next) => {
    const state = await cacher(req.url, opts)
    req.builtState = state
    next()
  }
}
