"use strict";

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _url = _interopRequireDefault(require("url"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _serializeDate(d) {
  return d.toISOString();
}

var _default = function _default(endpoint, query) {
  var parsed = _url.default.parse(endpoint);

  var q = _qs.default.stringify(Object.assign({}, _qs.default.parse(parsed.query, {
    strictNullHandling: true
  }), query), {
    strictNullHandling: true,
    serializeDate: _serializeDate
  });

  return _url.default.format({
    protocol: parsed.protocol,
    auth: parsed.auth,
    port: parsed.port,
    host: parsed.host,
    pathname: parsed.pathname,
    search: q
  });
};

exports.default = _default;
module.exports = exports.default;