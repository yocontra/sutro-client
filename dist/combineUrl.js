'use strict';

exports.__esModule = true;

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (endpoint, query) {
  var parsed = _url2.default.parse(endpoint);

  var q = _qs2.default.stringify(Object.assign({}, _qs2.default.parse(parsed.query, { strictNullHandling: true }), query), {
    strictNullHandling: true,
    serializeDate: function serializeDate(d) {
      return d.toISOString();
    }
  });

  return _url2.default.format({
    protocol: parsed.protocol,
    auth: parsed.auth,
    port: parsed.port,
    host: parsed.host,
    pathname: parsed.pathname,
    search: q
  });
};

module.exports = exports.default;