"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineUrl = exports.default = exports.request = void 0;
// @ts-nocheck
// Basically from https://github.com/sindresorhus/ky-universal/blob/main/index.js with modifications
require("whatwg-fetch");
require("abort-controller/polyfill");
var es6_1 = __importDefault(require("web-streams-polyfill/ponyfill/es6"));
var ky_1 = __importDefault(require("./ky"));
exports.request = ky_1.default;
if (!global.ReadableStream)
    global.ReadableStream = es6_1.default;
var index_1 = require("./index");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return __importDefault(index_1).default; } });
Object.defineProperty(exports, "combineUrl", { enumerable: true, get: function () { return index_1.combineUrl; } });
//# sourceMappingURL=browser.js.map