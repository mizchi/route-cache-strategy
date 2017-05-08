/* @flow */
export default [
  {
    pattern: '/items/:id',
    async createCacheKey(params: { id: string }) {
      return params.id
    }
  }
]
