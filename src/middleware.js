/* @flow */
import type {CacheStorategy, LoadOrUseOption} from './types'

import createCacher from './index'

// express middleware
type Middleware = (req: any, res: any, next: Function) => any

export default (
  strategies: CacheStorategy[],
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
