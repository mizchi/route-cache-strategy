/* @flow */

export type PathToRegexp = RegExp & {
  keys: {
    name: string // use only name from pathToRegexp(...) result
  }[]
}

export type CacheObject =
  | Map<string, *>
  | {
      get(key: string): Promise<string>,
      set(key: string, val: any, expire?: number): Promise<void>
    }

export type CacheStrategy = {
  pattern: string,
  createCacheKey: (params: any) => Promise<string> | string,
  expire?: number | void
}

export type CompiledCacheStrategy = CacheStrategy & {
  compiledPattern: PathToRegexp
}

export type CacherOption = {
  modifyCacheKey?: (key: string) => string,
  call(obj: { url: string }): Promise<any>
}

export type CacherAPI = {
  modifyCacheKey: (key: string) => string,
  call(obj: { url: string }): Promise<any>
}

// express middleware
export type Middleware = (req: any, res: any, next: Function) => any
