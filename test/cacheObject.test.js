// Implement storage interface by redis
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
