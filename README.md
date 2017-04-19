# cache-strategy

WIP

State cashing by routing.

This is focusing react ssr.

# CacheObject

```js

const redis = require("redis")
const client = redis.createClient()

const cacheObject = {
  get: (key: string) => new Promise((resolve, reject) => {
    client.get(key, (e, val): Promise<any> => {
      if (e) {
        return reject(e)
      }
      return resolve(val)
    });
  }),
  has: (key: boolean): Promise<boolean> => new Promise((resolve, reject) => {
    client.has(key, (e, val) => {
      if (e) {
        return reject(e)
      }
      return resolve(val)
    });
  }),
  set: (key: string, val: any) => new Promise((resolve, reject) => {
    client.set(key, val, (e, val) => {
      if (e) {
        return reject(e)
      }
      return resolve(val)
    });
  })
}
// client.set("string key", "string val", redis.print);
```


## Example

API Proposal

```js
import createCacher from 'cache-strategy'
import type { CacheObject, Strategy } from 'cache-strategy'

const cache: CacheObject = new Map()
const strategies: Strategy[] = [
  {
    pattern: '/items/:id',
    async createCacheKey(params) {
      // Build cache key with
      const res = await fetch(`/api/items/${params.id}/updated_at`)
      const updated_at = await res.text()
      return `items-${params.id}-${updated_at}`
    }
  }
]

// build cache
const cacher = createCacher(strategies, cache)

const server = // eg. express with router

// use raw
server.get('*', async (req, res) => {
  const platform = 'pc' // or switch to mobile by req.header
  const state = await cacher.loadOrUse(req.url, {
    // Add more info to key
    modifyCacheKey(key) {
      return key + ':' + platform
    },
    load() {
      return createStateByUrl(req.url)
    })
  })
  res.json(state)
})

// or express middleware
server.use(cacher.middleware(req => ({
  // Add more info to key
  modifyCacheKey(key) {
    return key + ':' + req.useragent
  },
  load() {
    return createStateByUrl(req.url)
  }
)))

// render steps with builtState
server.get('*', (req, res) => {
  try {
    const html = ReactDOMServer.renderToStaticMarkup(<App {...req.builtState}/>)
    res.send(html)
  } catch (e) {
    res.status(404).send('Not Found')
  }
})
```
