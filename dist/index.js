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
exports.combineUrl = void 0;
var combineUrl_1 = __importDefault(require("./combineUrl"));
exports.combineUrl = combineUrl_1.default;
var sendRequest_1 = __importStar(require("./sendRequest"));
var replaceWithPromises = function (obj, globalOptions) {
    return Object.entries(obj).reduce(function (acc, _a) {
        var k = _a[0], v = _a[1];
        // nested, recurse
        if (!v.path || !v.method) {
            acc[k] = replaceWithPromises(v, globalOptions);
            return acc;
        }
        var resolvedOptions = __assign({ url: v.path, method: v.method }, globalOptions);
        var fn = sendRequest_1.default.bind(null, resolvedOptions);
        fn.getOptions = sendRequest_1.getRequestOptions.bind(null, resolvedOptions);
        acc[k] = fn;
        return acc;
    }, Object.create(null));
};
exports.default = replaceWithPromises;
//# sourceMappingURL=index.js.map