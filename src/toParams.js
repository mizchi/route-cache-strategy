/* @flow */
import { parse as parseUrl } from 'url'
import { parse as parseQuery } from 'querystring'
import type { PathToRegexp } from './types'

export default (pattern: PathToRegexp, url: string) => {
  const { pathname, query }: any = parseUrl(url)
  const params = (query && parseQuery(query)) || {}
  const executed = pattern.exec(pathname)
  pattern.keys.forEach((key, n) => {
    params[key.name] = executed[n + 1]
  })
  return params
}
