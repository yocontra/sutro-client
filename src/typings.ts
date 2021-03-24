import { Options } from './ky'

// scaffolding types
export type ResourceDescriptor = {
  path: string
  method: string
}
export type ServerMeta = {
  [key: string]: ResourceDescriptor | ServerMeta
}

// actual req work
export type RequestOptionsFlat = {
  method?: Options['method']
  url?: string
  rewriteLargeRequests?: boolean
  root?: string
  data?: unknown
  options?: { [key: string]: any }
  headers?: Options['headers']
  simple?: boolean
  hooks?: Options['hooks']
  retry?: Options['retry']
  credentials?: Options['credentials']
  cache?: Options['cache']
  timeout?: Options['timeout']
  parse?: (data: string) => Promise<unknown>
  onError?: (error: Error) => void
  onData?: Options['onDownloadProgress']
}

export type RequestOptions =
  | RequestOptionsFlat
  | {
      root?: () => RequestOptionsFlat['root']
      url?: () => RequestOptionsFlat['url']
      credentials?: () => RequestOptionsFlat['credentials']
      retry?: () => RequestOptionsFlat['retry']
      headers?: () => RequestOptionsFlat['headers']
      options?: () => RequestOptionsFlat['options']
      data?: () => RequestOptionsFlat['data']
    }

export type ResponseObject = {
  ok: Response['ok']
  status: Response['status']
  headers: Response['headers']
  body?: unknown
  text?: string
}
export type ResponseObjectSimple = string | unknown

export type RequestObject = Promise<ResponseObject | ResponseObjectSimple> & {
  cancel?: () => void
}

export type Resource = (() => RequestObject) & {
  getOptions: () => RequestOptions
}

export type Resources<O> = {
  [K in keyof O]: O[K] extends ResourceDescriptor ? Resource : Resources<O[K]>
}
