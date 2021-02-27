"use strict";

require("core-js/modules/es.promise.js");

require("core-js/modules/es.object.to-string.js");

exports.__esModule = true;
exports.default = exports.getRequestOptions = void 0;

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.object.keys.js");

var _ky = _interopRequireDefault(require("./ky"));

var _urlJoin = _interopRequireDefault(require("url-join"));

var _templateUrl = _interopRequireDefault(require("template-url"));

var _qs = _interopRequireDefault(require("qs"));

var _lodash = _interopRequireDefault(require("lodash.merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var maxUrlLength = 4000;
var oneDay = 86400000; // options that can be resolved if they are functions

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
  var resolved = (0, _lodash.default)({}, resolveFunctions(defaultOptions), resolveFunctions(localOptions));
  var templated = (0, _templateUrl.default)(resolved.url, resolved);
  var url = resolved.root ? (0, _urlJoin.default)(resolved.root, templated) : templated;
  return Object.assign({}, resolved, {
    url: url,
    method: resolved.method.toLowerCase()
  });
};

exports.getRequestOptions = getRequestOptions;

function _callee4(res, _ref2) {
  var _ref2$parse, parse, text, body;

  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _ref2$parse = _ref2.parse, parse = _ref2$parse === void 0 ? JSON.parse : _ref2$parse;
          _context.next = 3;
          return res.text();

        case 3:
          text = _context.sent;
          _context.prev = 4;

          if (parse) {
            _context.next = 9;
            break;
          }

          _context.t0 = undefined;
          _context.next = 12;
          break;

        case 9:
          _context.next = 11;
          return parse(text);

        case 11:
          _context.t0 = _context.sent;

        case 12:
          body = _context.t0;
          _context.next = 17;
          break;

        case 15:
          _context.prev = 15;
          _context.t1 = _context["catch"](4);

        case 17:
          return _context.abrupt("return", {
            ok: res.ok,
            status: res.status,
            headers: res.headers,
            body: body,
            text: text
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _callee4, null, [[4, 15]]);
}

var createResponseObject = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(_callee4));

  return function createResponseObject(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = function _default(defaultOptions, localOptions) {
  var _options$options;

  var options = getRequestOptions(defaultOptions, localOptions);
  var qs = Object.assign({}, options.options, {
    includes: options.includes || ((_options$options = options.options) == null ? void 0 : _options$options.includes)
  }); // special handling needed for rewriting large queries

  var stringQuery,
      rewriting = false,
      method = options.method;

  if (Object.keys(qs).length !== 0) {
    stringQuery = serializeQuery(qs);

    if (stringQuery.length + options.url.length >= maxUrlLength) {
      if (options.rewriteLargeRequests && method.toLowerCase() === 'get') {
        method = 'post';
        rewriting = true;
      } else {
        console.warn('URL is longer than 4KB - this may cause issues! Try using rewriteLargeRequests.');
      }
    }
  }

  var headers = Object.assign({}, options.headers);
  if (rewriting) headers['X-HTTP-Method-Override'] = 'GET';
  var controller = options.controller || new AbortController();
  var signal = controller.signal;

  function _callee5(res) {
    var out;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return createResponseObject(res, {
              parse: options.parse
            });

          case 2:
            out = _context2.sent;

            if (!options.simple) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", out.body || out.text);

          case 5:
            return _context2.abrupt("return", out);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee5);
  }

  function _callee6(err) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!err.response) {
              _context3.next = 10;
              break;
            }

            err.status = err.response.status;
            _context3.prev = 2;
            _context3.next = 5;
            return createResponseObject(err.response, {
              parse: options.parse
            });

          case 5:
            err.res = _context3.sent;
            _context3.next = 10;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](2);

          case 10:
            if (options.onError) options.onError(err);
            throw err;

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee6, null, [[2, 8]]);
  }

  var out = (0, _ky.default)(options.url, {
    method: method,
    signal: signal,
    hooks: options.hooks,
    retry: options.retry,
    credentials: options.credentials,
    cache: options.cache,
    timeout: options.timeout || oneDay,
    headers: headers,
    searchParams: rewriting ? undefined : stringQuery,
    json: rewriting ? qs : options.data,
    onDownloadProgress: options.onData
  }).then( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(_callee5));

    return function (_x3) {
      return _ref4.apply(this, arguments);
    };
  }()).catch( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(_callee6));

    return function (_x4) {
      return _ref5.apply(this, arguments);
    };
  }());

  out.abort = function () {
    return controller.abort.apply(controller, arguments);
  };

  out.cancel = function () {
    return controller.abort();
  };

  return out;
};

exports.default = _default;