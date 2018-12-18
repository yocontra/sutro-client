import request from 'superagent'
import uJoin from 'url-join'
import template from 'template-url'
import qs from 'qs'
import merge from 'lodash.merge'
import mapValues from 'lodash.mapvalues'

// options that can be resolved if they are functions
const fns = [
  'root', 'url', 'credentials',
  'headers', 'options', 'data', 'simple'
]
const result = (fn, arg) => typeof fn === 'function' ? fn(arg) : fn
const resolveFunctions = (o) =>
  mapValues(o, (v, k) =>
    fns.includes(k) ? result(v, o) : v
  )

export const getRequestOptions = (defaultOptions, localOptions) => {
  const resolved = merge({}, resolveFunctions(defaultOptions), resolveFunctions(localOptions))
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
  const req = request[options.method](options.url)

  if (options.plugins) {
    options.plugins.forEach((p) => req.use(p))
  }
  if (options.options) {
    req.query(qs.stringify(options.options, { strictNullHandling: true }))
  }
  if (options.headers) req.set(options.headers)
  if (options.data) req.send(options.data)
  if (options.credentials) req.withCredentials()

  let out = new Promise((resolve, reject) => {
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
