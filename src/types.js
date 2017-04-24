/* @flow */
// Types
export type CacheObject = {
  has(key: string): Promise<boolean> | boolean,
  get(key: string): Promise<string> | any,
  set(key: string, val: any): Promise<void> | void
}

export type CacheStrategy = {
  pattern: string,
  createCacheKey: (params: any) => Promise<string> | string
}

export type CompiledCacheStrategy = CacheStrategy & {
  compiledPattern: RegExp
}

export type LoadOrUseOption = {
  modifyCacheKey(key: string): string,
  load(): Promise<any>
}

// express middleware
export type Middleware = (req: any, res: any, next: Function) => any
