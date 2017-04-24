# cache-strategy

WIP

State cashing by routing.

This is focusing react ssr.

## Example

```js
import createCacher from 'cache-strategy'

const strategies = [
  {
    pattern: '/items/:id',
    async createCacheKey(params) {
      const res = await fetch(`/api/items/${params.id}/updated_at`)
      const updated_at = await res.text()
      return `items-${params.id}-${updated_at}`
    },
    expire: 1 * 1000
  }
]

const func = async input => {
  return {
    url: input.url,
    createdAt: Date.now()
  }
}

const cacher = createCacher(myStrategies, func)
;(anync () => {
  const data = await cacher({url: '/items/aaa'})
  console.log(data)
})()
```

## Express Middleware

```js
const server = require('express')() // eg. express with router
import { middlewareCreator } from 'cache-strategy'
const cacher = createCacher([/* strategies */], input => ({/* loaded params */}))

server.use(middlewareCreator(cache, {
  modifyCacheKey(key, req) {
    return key + ':' + req.useragent
  }
)

// render steps with builtParams
server.get('*', (req, res) => {
  try {
    const html = ReactDOMServer.renderToStaticMarkup(<App {...req.builtParams}/>)
    res.send(html)
  } catch (e) {
    res.status(500).send('Internal Server Error')
  }
})
```
