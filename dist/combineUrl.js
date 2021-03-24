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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_1 = __importDefault(require("url"));
var qs_1 = __importDefault(require("qs"));
exports.default = (function (endpoint, query) {
    var parsed = url_1.default.parse(endpoint);
    var q = qs_1.default.stringify(__assign(__assign({}, qs_1.default.parse(parsed.query, { strictNullHandling: true })), query), {
        strictNullHandling: true,
        serializeDate: function (d) { return d.toISOString(); }
    });
    return url_1.default.format({
        protocol: parsed.protocol,
        auth: parsed.auth,
        port: parsed.port,
        host: parsed.host,
        pathname: parsed.pathname,
        search: q
    });
});
//# sourceMappingURL=combineUrl.js.map