/* @flow */
import test from 'ava'
import pathToRegexp from 'path-to-regexp'
import toParams from '../src/toParams'

test('#0 from pathToRegexp#exec to route object', t => {
  const route = toParams(pathToRegexp('/items/:id'), '/items/aaa')
  t.deepEqual(route, {
    id: 'aaa'
  })
})

test('#1 from pathToRegexp#exec to route object', t => {
  const route = toParams(pathToRegexp('/items/:id/:uuid'), '/items/aaa/bbb')
  t.deepEqual(route, {
    id: 'aaa',
    uuid: 'bbb'
  })
})
