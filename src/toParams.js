/* @flow */
import type { PathToRegexp } from './types'

export default (pattern: PathToRegexp, url: string) => {
  const params = {}
  const executed = pattern.exec(url)
  pattern.keys.forEach((key, n) => {
    params[key.name] = executed[n + 1]
  })
  return params
}
