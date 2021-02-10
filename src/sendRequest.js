import ky from './ky'
import uJoin from 'url-join'
import template from 'template-url'
import qs from 'qs'
import merge from 'lodash.merge'

const maxUrlLength = 4000
const oneDay = 86400000

// options that can be resolved if they are functions
const fns = [
  'root', 'url', 'credentials', 'retry',
  'headers', 'options', 'data', 'simple'
]
const result = (fn, arg) => typeof fn === 'function' ? fn(arg) : fn
const resolveFunctions = (o = {}) =>
  Object.entries(o).reduce((acc, [ k, v ]) => {
    acc[k] = fns.includes(k) ? result(v, o) : v
    return acc
  }, {})

const serializeQuery = (q) =>
  typeof q === 'string' ? q : qs.stringify(q, { strictNullHandling: true })

export const getRequestOptions = (defaultOptions, localOptions) => {
  const resolved = merge(
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

const createResponseObject = async (res, { parse = JSON.parse }) => {
  const text = await res.text()
  let body
  try {
    body = await parse(text)
  } catch (err) {
    // do nothing
  }
  return {
    ok: res.ok,
    status: res.status,
    headers: res.headers,
    body, text
  }
}
export default async (defaultOptions, localOptions) => {
  const options = getRequestOptions(defaultOptions, localOptions)

  const qs = {
    ...options.options,
    includes: options.includes || options.options?.includes
  }

  // special handling needed for rewriting large queries
  let stringQuery, rewriting = false, method = options.method
  if (Object.keys(qs).length !== 0) {
    stringQuery = serializeQuery(qs)
    if (stringQuery.length + options.url.length >= maxUrlLength) {
      if (options.rewriteLargeRequests && method.toLowerCase() === 'get') {
        method = 'post'
        rewriting = true
      } else {
        console.warn('URL is longer than 4KB - this may cause issues! Try using rewriteLargeRequests.')
      }
    }
  }

  const headers = { ...options.headers }
  if (rewriting) headers['X-HTTP-Method-Override'] = 'GET'

  const controller = new AbortController()
  const { signal } = controller

  const out = ky(options.url, {
    method,
    signal,
    hooks: options.hooks,
    retry: options.retry,
    credentials: options.credentials,
    timeout: options.timeout || oneDay,
    headers,
    searchParams: rewriting ? undefined : stringQuery,
    json: rewriting ? qs : options.data,
    onDownloadProgress: options.onData
  })
    .then(async (res) => {
      const out = await createResponseObject(res, { parse: options.parse })
      if (options.simple) return out.body || out.text
      return out
    })
    .catch(async (err) => {
      if (err.response) {
        err.res = await createResponseObject(err.response, { parse: options.parse })
        err.status = err.response.status
      }
      if (options.onError) options.onError(err)
      throw err
    })

  out.abort = () => controller.abort()
  return out
}
