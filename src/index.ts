import combineUrl from './combineUrl'
import sendRequest, { getRequestOptions } from './sendRequest'
import {
  RequestOptions,
  ServerMeta,
  Resource,
  Resources,
  ResourceDescriptor
} from './typings'

const replaceWithPromises = <
  O extends Record<any, ResourceDescriptor | ServerMeta>
>(
  obj: O,
  globalOptions: RequestOptions
): Resources<O> =>
  Object.entries(obj).reduce((acc, [k, v]) => {
    // nested, recurse
    if (!v.path || !v.method) {
      acc[k] = replaceWithPromises(v as ServerMeta, globalOptions)
      return acc
    }
    const resolvedOptions = {
      url: v.path,
      method: v.method,
      ...globalOptions
    }
    const fn: Resource = sendRequest.bind(null, resolvedOptions)
    fn.getOptions = getRequestOptions.bind(null, resolvedOptions)
    acc[k] = fn
    return acc
  }, Object.create(null))

export default replaceWithPromises

export { combineUrl }
