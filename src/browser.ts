// @ts-nocheck
// Basically from https://github.com/sindresorhus/ky-universal/blob/main/index.js with modifications
import 'whatwg-fetch'
import 'abort-controller/polyfill'
import ReadableStream from 'web-streams-polyfill/ponyfill/es6'
import request from './ky'

if (!global.ReadableStream) global.ReadableStream = ReadableStream

export { request }
export { default, combineUrl } from './index'
