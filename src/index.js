import sendRequest, { getRequestOptions } from './sendRequest'

const replaceWithPromises = (obj, globalOptions) =>
  Object.entries(obj).reduce((prev, [ k, v ]) => {
    if (!v.path || !v.method) {
      prev[k] = replaceWithPromises(v, globalOptions)
      return prev
    }
    const resolvedOptions = {
      url: v.path,
      method: v.method,
      ...globalOptions
    }
    const fn = sendRequest.bind(null, resolvedOptions)
    fn.getOptions = getRequestOptions.bind(null, resolvedOptions)
    prev[k] = fn
    return prev
  }, {})

export default (resources, options = {}) => {
  const start = resources.toJS ? resources.toJS() : resources
  return replaceWithPromises(start, options)
}
