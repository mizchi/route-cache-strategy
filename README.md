# route-cache-strategy

![](https://circleci.com/gh/mizchi/cache-strategy.svg?style=shield&circle-token=eb266c3df82a27985d950994624d7cd7f23ad49d)

State cashing by routing.

This is focusing react ssr.

## Install

```shell
npm install route-cache-strategy --save
# or
yarn add route-cache-strategy
```

## Example

```js
import createRouteCacher from 'route-cache-strategy'

const myStrategies = [
  {
    pattern: '/items/:id',
    async createCacheKey(params) {
      const res = await fetch(`/api/items/${params.id}/updated_at`)
      const updated_at = await res.text()
      return `items-${params.id}-${updated_at}`
    },
    expire: 60 * 1000 // it works with only redis
  }
]

const func = async input => {
  return {
    url: input.url,
    createdAt: Date.now()
  }
}

const cacher = createRouteCacher(myStrategies, func)
;(anync () => {
  const data = await cacher({url: '/items/aaa'})
  console.log(data)
})()
```

## License

MIT
