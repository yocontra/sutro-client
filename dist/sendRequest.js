"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.includes");

require("core-js/modules/web.dom-collections.for-each");

exports.__esModule = true;
exports.default = exports.getRequestOptions = void 0;

require("regenerator-runtime/runtime");

var _superagent = _interopRequireDefault(require("superagent"));

var _urlJoin = _interopRequireDefault(require("url-join"));

var _templateUrl = _interopRequireDefault(require("template-url"));

var _qs = _interopRequireDefault(require("qs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// options that can be resolved if they are functions
var fns = ['root', 'url', 'credentials', 'retry', 'headers', 'options', 'data', 'simple'];

var result = function result(fn, arg) {
  return typeof fn === 'function' ? fn(arg) : fn;
};

var resolveFunctions = function resolveFunctions(o) {
  if (o === void 0) {
    o = {};
  }

  return Object.entries(o).reduce(function (acc, _ref) {
    var k = _ref[0],
        v = _ref[1];
    acc[k] = fns.includes(k) ? result(v, o) : v;
    return acc;
  }, {});
};

var serializeQuery = function serializeQuery(q) {
  return typeof q === 'string' ? q : _qs.default.stringify(q, {
    strictNullHandling: true
  });
};

var getRequestOptions = function getRequestOptions(defaultOptions, localOptions) {
  var resolved = Object.assign({}, resolveFunctions(defaultOptions), resolveFunctions(localOptions));
  var templated = (0, _templateUrl.default)(resolved.url, resolved);
  var url = resolved.root ? (0, _urlJoin.default)(resolved.root, templated) : templated;
  return _objectSpread(_objectSpread({}, resolved), {}, {
    url: url,
    method: resolved.method.toLowerCase()
  });
};

exports.getRequestOptions = getRequestOptions;

var _default = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(defaultOptions, localOptions) {
    var options, stringQuery, rewriting, method, req, out;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = getRequestOptions(defaultOptions, localOptions); // special handling needed for rewriting large queries

            rewriting = false, method = options.method;

            if (options.options) {
              stringQuery = serializeQuery(options.options);

              if (stringQuery.length + options.url.length >= 4000) {
                if (options.rewriteLargeRequests && method.toLowerCase() === 'get') {
                  method = 'post';
                  rewriting = true;
                } else {
                  console.warn('URL is longer than 4KB - this may cause issues! Try using rewriteLargeRequests.');
                }
              }
            }

            req = _superagent.default[method](options.url);

            if (options.retry) {
              req.retry(options.retry, options.shouldRetry);
            }

            if (options.timeout) {
              req.timeout(options.timeout);
            }

            if (options.plugins) {
              options.plugins.forEach(function (p) {
                return req.use(p);
              });
            }

            if (options.options) {
              rewriting ? req.set('X-HTTP-Method-Override', 'GET').send(options.options) : req.query(stringQuery);
            }

            if (options.includes) {
              req.query(serializeQuery({
                includes: options.includes
              }));
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

            return _context.abrupt("return", out);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _default;