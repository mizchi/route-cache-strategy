/* @flow */
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import createCacher from '../../../src'
import createStore from './store'
import strategies from './strategies'
import App from './components/App'

function renderFullPage(initialState: any) {
  const html = ReactDOMServer.renderToString(
    <Provider store={createStore(initialState)}>
      <App />
    </Provider>
  )
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charSet="utf-8" >
  </head>
  <body>
    <main>${html}</main>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(initialState).replace(/</g, '\\u003c')}
    </script>
    <script src="/bundle.js"></script>
  </body>
</html>
  `
}

const load = input => {
  return {
    url: input.url,
    createdAt: Date.now()
  }
}

const cacher = createCacher(strategies, load, new Map())

const server = express()
server.use(express.static(__dirname + '/../public'))
server.use(async (req, res, next) => {
  const params = await cacher({ url: req.url })
  req.builtParams = params
  next()
})

server.get('*', (req, res) => {
  const initialState = req.builtParams
  if (req.headers['content-type'] === 'applicaiton/json') {
    res.setHeader('content-type', 'applicaiton/json')
    return res.send(initialState)
  }
  const html = renderFullPage(initialState)
  console.log('render html', html)
  res.setHeader('content-type', 'text/html')
  res.send(html)
})

server.listen(9999)
