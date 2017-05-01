/* @flow */
import test from 'ava'
import isUrlCacheable from '../src/isUrlCacheable'
import compileCacheStrategies from '../src/compileCacheStrategies'

const myStrategies = [
  {
    pattern: '/items/:id',
    createCacheKey (params: { id: string }) {
      return params.id
    }
  }
]

test('returns true if url is included', t => {
  const compiled = compileCacheStrategies(myStrategies)
  const cacheable = isUrlCacheable(compiled)('/items/:id')
  t.is(cacheable, true)
})

test('returns false if url is not included', t => {
  const compiled = compileCacheStrategies(myStrategies)
  const cacheable = isUrlCacheable(compiled)('/xxx/yyy')
  t.is(cacheable, false)
})

test('returns true if url is included with parameter', t => {
  const compiled = compileCacheStrategies(myStrategies)
  const cacheable = isUrlCacheable(compiled)('/items/:id?a=1')
  t.is(cacheable, true)
})
