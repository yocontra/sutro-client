import combineUrl from './combineUrl'
import sendRequest, { getRequestOptions } from './sendRequest'
import request from './ky'
import { RequestOptions, ServerMeta, Resources, Resource } from './typings'

const replaceWithPromises = (
  obj: ServerMeta,
  globalOptions: RequestOptions
): Resources =>
  Object.entries(obj).reduce((prev, [k, v]) => {
    // nested, recurse
    if (!v.path || !v.method) {
      prev[k] = replaceWithPromises(v as ServerMeta, globalOptions)
      return prev
    }
    const resolvedOptions = {
      url: v.path,
      method: v.method,
      ...globalOptions
    }
    const fn: Resource = sendRequest.bind(null, resolvedOptions)
    fn.getOptions = getRequestOptions.bind(null, resolvedOptions)
    prev[k] = fn
    return prev
  }, {})

export default replaceWithPromises

export { combineUrl, request }
