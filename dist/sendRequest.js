'use strict';

exports.__esModule = true;
exports.getRequestOptions = undefined;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var _templateUrl = require('template-url');

var _templateUrl2 = _interopRequireDefault(_templateUrl);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.mapvalues');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// options that can be resolved if they are functions
const fns = ['root', 'url', 'credentials', 'headers', 'options', 'data'];
const result = (fn, arg) => typeof fn === 'function' ? fn(arg) : fn;
const resolveFunctions = o => (0, _lodash4.default)(o, (v, k) => fns.includes(k) ? result(v, o) : v);

const getRequestOptions = exports.getRequestOptions = (defaultOptions, localOptions) => {
  const resolved = (0, _lodash2.default)({}, resolveFunctions(defaultOptions), resolveFunctions(localOptions));
  const templated = (0, _templateUrl2.default)(resolved.url, resolved);
  const url = resolved.root ? (0, _urlJoin2.default)(resolved.root, templated) : templated;
  return Object.assign({}, resolved, {
    url,
    method: resolved.method.toLowerCase()
  });
};

exports.default = async (defaultOptions, localOptions) => {
  const options = getRequestOptions(defaultOptions, localOptions);
  const req = _superagent2.default[options.method](options.url);

  if (options.plugins) {
    options.plugins.forEach(p => req.use(p));
  }
  if (options.options) {
    req.query(_qs2.default.stringify(options.options, { strictNullHandling: true }));
  }
  if (options.headers) req.set(options.headers);
  if (options.data) req.send(options.data);
  if (options.credentials) req.withCredentials();

  let out = req.then(res => ({
    status: res.status,
    headers: res.headers,
    body: res.body,
    text: res.text
  }));
  if (options.onError) out = out.catch(options.onError);
  out.cancel = () => req.abort();
  return out;
};