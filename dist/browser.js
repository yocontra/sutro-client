"use strict";

exports.__esModule = true;
exports.request = exports.combineUrl = exports.default = void 0;

require("whatwg-fetch");

require("abort-controller/polyfill");

var _es = _interopRequireDefault(require("web-streams-polyfill/ponyfill/es6"));

var _index = _interopRequireWildcard(require("./index"));

exports.default = _index.default;
exports.combineUrl = _index.combineUrl;
exports.request = _index.request;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Basically from https://github.com/sindresorhus/ky-universal/blob/main/index.js with modifications
if (!global.ReadableStream) global.ReadableStream = _es.default;