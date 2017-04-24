/* @flow */
import redis from 'redis'

export const client = redis.createClient()

// Implement storage interface by redis
const cacheObject = {
  get: (key: string) => new Promise((resolve, reject) => {
    client.get(key, (e, val) => {
      if (e) {
        return reject(e)
      }
      return resolve(JSON.parse(val))
    })
  }),
  set: (key: string, val: any, expire: number = 60 * 60 * 1000) => new Promise((resolve, reject) => {
    client.setex(key, ~~(expire / 1000), JSON.stringify(val), e => {
      if (e) {
        return reject(e)
      }
      return resolve()
    })
  })
}

export default cacheObject
