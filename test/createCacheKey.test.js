/* @flow */
import test from 'ava'
import compileCacheStrategies from '../src/compileCacheStrategies'
import createCacheKey from '../src/createCacheKey'

const myStrategies = [
  {
    pattern: '/items/:id',
    createCacheKey (params: { id: string }) {
      return 'cache:' + params.id
    }
  }
]

test('returns key if url is included', async t => {
  const compiled = compileCacheStrategies(myStrategies)
  const key = await createCacheKey(compiled)('/items/aaa')
  t.is(key, 'cache:aaa')
})

test('throws error if url is not included', async t => {
  const compiled = compileCacheStrategies(myStrategies)
  await t.throws(
    createCacheKey(compiled)('/xxx/yyy')
  )
  t.pass()
})
