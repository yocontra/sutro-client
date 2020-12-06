import request from 'superagent'
import uJoin from 'url-join'
import template from 'template-url'
import qs from 'qs'
import merge from 'lodash.merge'

const maxUrlLength = 4000

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

export default async (defaultOptions, localOptions) => {
  const options = getRequestOptions(defaultOptions, localOptions)

  // special handling needed for rewriting large queries
  let stringQuery, rewriting = false, method = options.method
  if (options.options) {
    stringQuery = serializeQuery(options.options)
    if (stringQuery.length + options.url.length >= maxUrlLength) {
      if (options.rewriteLargeRequests && method.toLowerCase() === 'get') {
        method = 'post'
        rewriting = true
      } else {
        console.warn('URL is longer than 4KB - this may cause issues! Try using rewriteLargeRequests.')
      }
    }
  }

  const req = request[method](options.url)

  if (options.retry) {
    req.retry(options.retry, options.shouldRetry)
  }
  if (options.timeout) {
    req.timeout(options.timeout)
  }
  if (options.plugins) {
    options.plugins.forEach((p) => req.use(p))
  }
  if (options.options) {
    rewriting
      ? req
        .set('X-HTTP-Method-Override', 'GET')
        .send(options.options)
      : req.query(stringQuery)
  }
  if (options.includes) {
    req.query(serializeQuery({ includes: options.includes }))
  }
  if (options.headers) req.set(options.headers)
  if (options.data) req.send(options.data)
  if (options.credentials) req.withCredentials()

  const out = new Promise((resolve, reject) => {
    req.end((err, res) => {
      if (err) {
        err.res = err.response || res
        if (options.onError) options.onError(err)
        return reject(err)
      }
      resolve(options.simple
        ? res.body || res.text
        : {
          status: res.status,
          headers: res.headers,
          body: res.body,
          text: res.text
        })
    })
  })
  out.cancel = () => req.abort()
  return out
}
