"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineUrl = exports.default = exports.request = void 0;
// @ts-nocheck
// Basically from https://github.com/sindresorhus/ky-universal/blob/main/index.js with modifications
var node_fetch_1 = __importStar(require("node-fetch"));
var es2018_1 = __importDefault(require("web-streams-polyfill/ponyfill/es2018"));
var ky_1 = __importDefault(require("./ky"));
exports.request = ky_1.default;
var TEN_MEGABYTES = 10000000;
if (!global.fetch) {
    global.fetch = function (url, options) {
        return node_fetch_1.default(url, __assign({ highWaterMark: TEN_MEGABYTES }, options));
    };
}
if (!global.Headers)
    global.Headers = node_fetch_1.Headers;
if (!global.Request)
    global.Request = node_fetch_1.Request;
if (!global.Response)
    global.Response = node_fetch_1.Response;
if (!global.ReadableStream)
    global.ReadableStream = es2018_1.default;
var index_1 = require("./index");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(index_1).default; } });
Object.defineProperty(exports, "combineUrl", { enumerable: true, get: function () { return index_1.combineUrl; } });
//# sourceMappingURL=node.js.map