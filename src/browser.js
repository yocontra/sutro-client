// Basically from https://github.com/sindresorhus/ky-universal/blob/main/index.js with modifications
import 'whatwg-fetch'
import 'abort-controller/polyfill'
import ReadableStream from 'web-streams-polyfill/ponyfill/es6'

if (!global.ReadableStream) global.ReadableStream = ReadableStream

export { default, combineUrl, request } from './index'
