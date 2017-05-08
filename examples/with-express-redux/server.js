/* @flow */
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import createCacher from '../../src'
import cache from './cache'

const strategies = [
  {
    pattern: '/items/:id',
    async createCacheKey (params: { id: string }) {
      return params.id
    },
    expire: 10 * 1000
  }
]

const load = input => {
  return {
    url: input.url,
    createdAt: Date.now()
  }
}

const cacher = createCacher(strategies, load, cache)

const server = express()
server.use(async (req, res, next) => {
  const params = await cacher({ url: req.url })
  req.builtParams = params
  next()
})

server.get('*', (req, res) => {
  const html = ReactDOMServer.renderToString(
    <div>
      <h1>{req.builtParams.url}</h1>
      <p>{req.builtParams.createdAt}</p>
    </div>
  )
  res.send(html)
})

server.listen(9999)
