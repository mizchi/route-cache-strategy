/* @flow */
import test from 'ava'
import pathToRegexp from 'path-to-regexp'
import toParams from '../src/toParams'

test('parse pathToRegexp#exec to route object #1', t => {
  const route = toParams(pathToRegexp('/items/:id'), '/items/aaa')
  t.deepEqual(route, {
    id: 'aaa'
  })
})

test('parse pathToRegexp#exec to route object #2', t => {
  const route = toParams(pathToRegexp('/items/:id/:uuid'), '/items/aaa/bbb')
  t.deepEqual(route, {
    id: 'aaa',
    uuid: 'bbb'
  })
})

test('parse query parameter #1', t => {
  const route = toParams(pathToRegexp('/'), '/?a=1')
  t.deepEqual(route, {
    a: '1'
  })
})

test('parse query parameter #2', t => {
  const route = toParams(pathToRegexp('/'), '/?a=1&b=2')
  t.deepEqual(route, {
    a: '1',
    b: '2'
  })
})

test('parse query parameter #3', t => {
  const route = toParams(pathToRegexp('/items/:id'), '/items/aaa?page=1')
  t.deepEqual(route, {
    id: 'aaa',
    page: '1'
  })
})
