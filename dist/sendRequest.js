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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// options that can be resolved if they are functions
var fns = ['root', 'url', 'credentials', 'headers', 'options', 'data', 'simple'];
var result = function result(fn, arg) {
  return typeof fn === 'function' ? fn(arg) : fn;
};
var resolveFunctions = function resolveFunctions(o) {
  return (0, _lodash4.default)(o, function (v, k) {
    return fns.includes(k) ? result(v, o) : v;
  });
};

var getRequestOptions = exports.getRequestOptions = function getRequestOptions(defaultOptions, localOptions) {
  var resolved = (0, _lodash2.default)({}, resolveFunctions(defaultOptions), resolveFunctions(localOptions));
  var templated = (0, _templateUrl2.default)(resolved.url, resolved);
  var url = resolved.root ? (0, _urlJoin2.default)(resolved.root, templated) : templated;
  return Object.assign({}, resolved, {
    url: url,
    method: resolved.method.toLowerCase()
  });
};

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(defaultOptions, localOptions) {
    var options, req, out;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = getRequestOptions(defaultOptions, localOptions);
            req = _superagent2.default[options.method](options.url);


            if (options.plugins) {
              options.plugins.forEach(function (p) {
                return req.use(p);
              });
            }
            if (options.options) {
              req.query(_qs2.default.stringify(options.options, { strictNullHandling: true }));
            }
            if (options.includes) {
              req.query(_qs2.default.stringify({ includes: options.includes }, { strictNullHandling: true }));
            }
            if (options.headers) req.set(options.headers);
            if (options.data) req.send(options.data);
            if (options.credentials) req.withCredentials();

            out = new Promise(function (resolve, reject) {
              req.end(function (err, res) {
                if (err) {
                  err.res = err.response || res;
                  if (options.onError) options.onError(err);
                  return reject(err);
                }
                resolve(options.simple ? res.body || res.text : {
                  status: res.status,
                  headers: res.headers,
                  body: res.body,
                  text: res.text
                });
              });
            });

            out.cancel = function () {
              return req.abort();
            };
            return _context.abrupt('return', out);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();