/* @flow */
import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

const server = express()
server.get('/', (req, res) => {
  const html = ReactDOMServer.renderToString(<h1>hello</h1>)
  res.send(html)
})

server.listen(9999)
