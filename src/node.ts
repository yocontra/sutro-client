// @ts-nocheck
// Basically from https://github.com/sindresorhus/ky-universal/blob/main/index.js with modifications
import fetch, { Headers, Request, Response } from 'node-fetch'
import ReadableStream from 'web-streams-polyfill/ponyfill/es2018'
import request from './ky'

const TEN_MEGABYTES = 10000000

if (!global.fetch) {
  global.fetch = (url, options) =>
    fetch(url, {
      highWaterMark: TEN_MEGABYTES,
      ...options
    })
}

if (!global.Headers) global.Headers = Headers
if (!global.Request) global.Request = Request
if (!global.Response) global.Response = Response
if (!global.ReadableStream) global.ReadableStream = ReadableStream

export { request }
export { default, combineUrl } from './index'
