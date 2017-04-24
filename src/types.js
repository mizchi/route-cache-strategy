/* @flow */

export type PathToRegexp = RegExp & {
  keys: {
    name: string
  }[]
}

export type CacheObject = Map<string, *> | {
  has(key: string): Promise<boolean>,
  get(key: string): Promise<string>,
  set(key: string, val: any): Promise<void>
}

export type CacheStrategy = {
  pattern: string,
  createCacheKey: (params: any) => Promise<string> | string
}

export type CompiledCacheStrategy = CacheStrategy & {
  compiledPattern: PathToRegexp
}

export type CacherOption = {
  modifyCacheKey?: (key: string) => string,
  load(obj: { url: string }): Promise<any>
}

export type CacherAPI = {
  modifyCacheKey: (key: string) => string,
  load(obj: { url: string }): Promise<any>
}

// express middleware
export type Middleware = (req: any, res: any, next: Function) => any
