/* @flow */

// pathToRegexp.exec(...)  => object
export default function toParams (regexp: any) {
  const match = {}
  regexp.keys.forEach((key, n) => {
    match[key.name] = regexp[n + 1]
  })
  return match
}
