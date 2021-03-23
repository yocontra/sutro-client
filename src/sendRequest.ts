import ky from './ky'
import uJoin from 'url-join'
import template from 'template-url'
import qs from 'qs'
import merge from 'lodash.merge'
import {
  RequestOptions,
  RequestOptionsFlat,
  RequestObject,
  ResponseObject
} from './typings'

const maxUrlLength = 4000
const oneDay = 86400000

// options that can be resolved if they are functions
const fns = [
  'root',
  'url',
  'credentials',
  'retry',
  'headers',
  'options',
  'data'
]
type GenericOptionFunction = (options: RequestOptions) => unknown
const resolveFunctions = (o: RequestOptions = {}): RequestOptionsFlat =>
  Object.entries(o).reduce((acc, [k, v]) => {
    acc[k] =
      fns.includes(k) && typeof v === 'function'
        ? (v as GenericOptionFunction)(o)
        : v
    return acc
  }, {})

const serializeQuery = (q: string | RequestOptionsFlat['options']) =>
  typeof q === 'string' ? q : qs.stringify(q, { strictNullHandling: true })

export const getRequestOptions = (
  defaultOptions: RequestOptions,
  localOptions: RequestOptions
): RequestOptionsFlat => {
  const resolved: RequestOptionsFlat = merge(
    {},
    resolveFunctions(defaultOptions),
    resolveFunctions(localOptions)
  )
  const templated = template(resolved.url, resolved)
  const url = resolved.root ? uJoin(resolved.root, templated) : templated
  return {
    ...resolved,
    url,
    method: resolved.method.toLowerCase()
  }
}

const createResponseObject = async (
  res: Response,
  { parse = JSON.parse }
): Promise<ResponseObject> => {
  const text = await res.text()
  let body
  try {
    body = !parse ? undefined : await parse(text)
  } catch (err) {
    // do nothing
  }
  return {
    ok: res.ok,
    status: res.status,
    headers: res.headers,
    body,
    text
  }
}

export default (
  defaultOptions: RequestOptions,
  localOptions: RequestOptions
): RequestObject => {
  const options = getRequestOptions(defaultOptions, localOptions)
  const qs = options.options

  // special handling needed for rewriting large queries
  let stringQuery: string,
    rewriting = false,
    method = options.method
  if (Object.keys(qs).length !== 0) {
    stringQuery = serializeQuery(qs)
    if (stringQuery.length + options.url.length >= maxUrlLength) {
      if (options.rewriteLargeRequests && method.toLowerCase() === 'get') {
        method = 'post'
        rewriting = true
      } else {
        console.warn(
          'URL is longer than 4KB - this may cause issues! Try using rewriteLargeRequests.'
        )
      }
    }
  }

  const headers = { ...options.headers }
  if (rewriting) headers['X-HTTP-Method-Override'] = 'GET'

  const controller = new AbortController()
  const { signal } = controller

  const req = ky(options.url, {
    method,
    signal,
    hooks: options.hooks,
    retry: options.retry,
    credentials: options.credentials,
    cache: options.cache,
    timeout: options.timeout || oneDay,
    headers,
    searchParams: rewriting ? undefined : stringQuery,
    json: rewriting ? qs : options.data,
    onDownloadProgress: options.onData
  })

  const ret: RequestObject = req
    .then(async (res) => {
      const out: ResponseObject = await createResponseObject(res, {
        parse: options.parse
      })
      return options.simple ? out.body || out.text : out
    })
    .catch(async (err) => {
      if (err.response) {
        err.status = err.response.status
        try {
          err.res = await createResponseObject(err.response, {
            parse: options.parse
          })
        } catch (_) {
          // ignore
        }
      }
      if (options.onError) options.onError(err)
      throw err
    })

  ret.cancel = () => controller.abort()

  return ret
}
