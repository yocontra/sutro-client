"use strict";

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.array-buffer.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.number.constructor.js");

require("core-js/modules/es.number.is-nan.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.ends-with.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.string.starts-with.js");

require("core-js/modules/es.typed-array.uint8-array.js");

require("core-js/modules/es.typed-array.copy-within.js");

require("core-js/modules/es.typed-array.every.js");

require("core-js/modules/es.typed-array.fill.js");

require("core-js/modules/es.typed-array.filter.js");

require("core-js/modules/es.typed-array.find.js");

require("core-js/modules/es.typed-array.find-index.js");

require("core-js/modules/es.typed-array.for-each.js");

require("core-js/modules/es.typed-array.includes.js");

require("core-js/modules/es.typed-array.index-of.js");

require("core-js/modules/es.typed-array.iterator.js");

require("core-js/modules/es.typed-array.join.js");

require("core-js/modules/es.typed-array.last-index-of.js");

require("core-js/modules/es.typed-array.map.js");

require("core-js/modules/es.typed-array.reduce.js");

require("core-js/modules/es.typed-array.reduce-right.js");

require("core-js/modules/es.typed-array.reverse.js");

require("core-js/modules/es.typed-array.set.js");

require("core-js/modules/es.typed-array.slice.js");

require("core-js/modules/es.typed-array.some.js");

require("core-js/modules/es.typed-array.sort.js");

require("core-js/modules/es.typed-array.subarray.js");

require("core-js/modules/es.typed-array.to-locale-string.js");

require("core-js/modules/es.typed-array.to-string.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/web.url.js");

exports.__esModule = true;
exports.default = void 0;

require("regenerator-runtime/runtime.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*! MIT License © Sindre Sorhus */
var globalThis = typeof window === 'undefined' ? global : window; // only line added

var isObject = function isObject(value) {
  return value !== null && typeof value === 'object';
};

var supportsAbortController = typeof globalThis.AbortController === 'function';
var supportsStreams = typeof globalThis.ReadableStream === 'function';
var supportsFormData = typeof globalThis.FormData === 'function';

var mergeHeaders = function mergeHeaders(source1, source2) {
  var result = new globalThis.Headers(source1 || {});
  var isHeadersInstance = source2 instanceof globalThis.Headers;
  var source = new globalThis.Headers(source2 || {});

  for (var _iterator = _createForOfIteratorHelperLoose(source), _step; !(_step = _iterator()).done;) {
    var _step$value = _step.value,
        key = _step$value[0],
        value = _step$value[1];

    if (isHeadersInstance && value === 'undefined' || value === undefined) {
      result.delete(key);
    } else {
      result.set(key, value);
    }
  }

  return result;
};

var deepMerge = function deepMerge() {
  var returnValue = {};
  var headers = {};

  for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  for (var _i = 0, _sources = sources; _i < _sources.length; _i++) {
    var source = _sources[_i];

    if (Array.isArray(source)) {
      if (!Array.isArray(returnValue)) {
        returnValue = [];
      }

      returnValue = [].concat(returnValue, source);
    } else if (isObject(source)) {
      for (var _i2 = 0, _Object$entries = Object.entries(source); _i2 < _Object$entries.length; _i2++) {
        var _Object$assign;

        var _Object$entries$_i = _Object$entries[_i2],
            key = _Object$entries$_i[0],
            value = _Object$entries$_i[1];

        if (isObject(value) && key in returnValue) {
          value = deepMerge(returnValue[key], value);
        }

        returnValue = Object.assign({}, returnValue, (_Object$assign = {}, _Object$assign[key] = value, _Object$assign));
      }

      if (isObject(source.headers)) {
        headers = mergeHeaders(headers, source.headers);
      }
    }

    returnValue.headers = headers;
  }

  return returnValue;
};

var requestMethods = ['get', 'post', 'put', 'patch', 'head', 'delete'];
var responseTypes = {
  json: 'application/json',
  text: 'text/*',
  formData: 'multipart/form-data',
  arrayBuffer: '*/*',
  blob: '*/*'
};
var retryMethods = ['get', 'put', 'head', 'delete', 'options', 'trace'];
var retryStatusCodes = [408, 413, 429, 500, 502, 503, 504];
var retryAfterStatusCodes = [413, 429, 503];
var stop = Symbol('stop');

var HTTPError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(HTTPError, _Error);

  function HTTPError(response, request, options) {
    var _this;

    // Set the message to the status text, such as Unauthorized,
    // with some fallbacks. This message should never be undefined.
    _this = _Error.call(this, response.statusText || String(response.status === 0 || response.status ? response.status : 'Unknown response error')) || this;
    _this.name = 'HTTPError';
    _this.response = response;
    _this.request = request;
    _this.options = options;
    return _this;
  }

  return HTTPError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var TimeoutError = /*#__PURE__*/function (_Error2) {
  _inheritsLoose(TimeoutError, _Error2);

  function TimeoutError(request) {
    var _this2;

    _this2 = _Error2.call(this, 'Request timed out') || this;
    _this2.name = 'TimeoutError';
    _this2.request = request;
    return _this2;
  }

  return TimeoutError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var delay = function delay(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}; // `Promise.race()` workaround (#91)


var timeout = function timeout(request, abortController, options) {
  return new Promise(function (resolve, reject) {
    var timeoutID = setTimeout(function () {
      if (abortController) {
        abortController.abort();
      }

      reject(new TimeoutError(request));
    }, options.timeout);
    /* eslint-disable promise/prefer-await-to-then */

    options.fetch(request).then(resolve).catch(reject).then(function () {
      clearTimeout(timeoutID);
    });
    /* eslint-enable promise/prefer-await-to-then */
  });
};

var normalizeRequestMethod = function normalizeRequestMethod(input) {
  return requestMethods.includes(input) ? input.toUpperCase() : input;
};

var defaultRetryOptions = {
  limit: 2,
  methods: retryMethods,
  statusCodes: retryStatusCodes,
  afterStatusCodes: retryAfterStatusCodes
};

var normalizeRetryOptions = function normalizeRetryOptions(retry) {
  if (retry === void 0) {
    retry = {};
  }

  if (typeof retry === 'number') {
    return Object.assign({}, defaultRetryOptions, {
      limit: retry
    });
  }

  if (retry.methods && !Array.isArray(retry.methods)) {
    throw new Error('retry.methods must be an array');
  }

  if (retry.statusCodes && !Array.isArray(retry.statusCodes)) {
    throw new Error('retry.statusCodes must be an array');
  }

  return Object.assign({}, defaultRetryOptions, retry, {
    afterStatusCodes: retryAfterStatusCodes
  });
}; // The maximum value of a 32bit int (see issue #117)


var maxSafeTimeout = 2147483647;

function _Ky(input, options) {
  var _this3 = this;

  if (options === void 0) {
    options = {};
  }

  this._retryCount = 0;
  this._input = input;
  this._options = Object.assign({
    // TODO: credentials can be removed when the spec change is implemented in all browsers. Context: https://www.chromestatus.com/feature/4539473312350208
    credentials: this._input.credentials || 'same-origin'
  }, options, {
    headers: mergeHeaders(this._input.headers, options.headers),
    hooks: deepMerge({
      beforeRequest: [],
      beforeRetry: [],
      afterResponse: []
    }, options.hooks),
    method: normalizeRequestMethod(options.method || this._input.method),
    prefixUrl: String(options.prefixUrl || ''),
    retry: normalizeRetryOptions(options.retry),
    throwHttpErrors: options.throwHttpErrors !== false,
    timeout: typeof options.timeout === 'undefined' ? 10000 : options.timeout,
    fetch: options.fetch || globalThis.fetch.bind(globalThis)
  });

  if (typeof this._input !== 'string' && !(this._input instanceof URL || this._input instanceof globalThis.Request)) {
    throw new TypeError('`input` must be a string, URL, or Request');
  }

  if (this._options.prefixUrl && typeof this._input === 'string') {
    if (this._input.startsWith('/')) {
      throw new Error('`input` must not begin with a slash when using `prefixUrl`');
    }

    if (!this._options.prefixUrl.endsWith('/')) {
      this._options.prefixUrl += '/';
    }

    this._input = this._options.prefixUrl + this._input;
  }

  function _ref2() {
    _this3.abortController.abort();
  }

  if (supportsAbortController) {
    this.abortController = new globalThis.AbortController();

    if (this._options.signal) {
      this._options.signal.addEventListener('abort', _ref2);
    }

    this._options.signal = this.abortController.signal;
  }

  this.request = new globalThis.Request(this._input, this._options);

  if (this._options.searchParams) {
    var searchParams = "?" + new URLSearchParams(this._options.searchParams).toString();
    var url = this.request.url.replace(/(?:\?.*?)?(?=#|$)/, searchParams); // To provide correct form boundary, Content-Type header should be deleted each time when new Request instantiated from another one

    if ((supportsFormData && this._options.body instanceof globalThis.FormData || this._options.body instanceof URLSearchParams) && !(this._options.headers && this._options.headers['content-type'])) {
      this.request.headers.delete('content-type');
    }

    this.request = new globalThis.Request(new globalThis.Request(url, this.request), this._options);
  }

  if (this._options.json !== undefined) {
    this._options.body = JSON.stringify(this._options.json);
    this.request.headers.set('content-type', 'application/json');
    this.request = new globalThis.Request(this.request, {
      body: this._options.body
    });
  }

  function _callee8() {
    var response, _iterator2, _step2, hook, modifiedResponse;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(_this3._options.timeout > maxSafeTimeout)) {
              _context.next = 2;
              break;
            }

            throw new RangeError("The `timeout` option cannot be greater than " + maxSafeTimeout);

          case 2:
            _context.next = 4;
            return delay(1);

          case 4:
            _context.next = 6;
            return _this3._fetch();

          case 6:
            response = _context.sent;
            _iterator2 = _createForOfIteratorHelperLoose(_this3._options.hooks.afterResponse);

          case 8:
            if ((_step2 = _iterator2()).done) {
              _context.next = 16;
              break;
            }

            hook = _step2.value;
            _context.next = 12;
            return hook(_this3.request, _this3._options, _this3._decorateResponse(response.clone()));

          case 12:
            modifiedResponse = _context.sent;

            if (modifiedResponse instanceof globalThis.Response) {
              response = modifiedResponse;
            }

          case 14:
            _context.next = 8;
            break;

          case 16:
            _this3._decorateResponse(response);

            if (!(!response.ok && _this3._options.throwHttpErrors)) {
              _context.next = 19;
              break;
            }

            throw new HTTPError(response, _this3.request, _this3._options);

          case 19:
            if (!_this3._options.onDownloadProgress) {
              _context.next = 25;
              break;
            }

            if (!(typeof _this3._options.onDownloadProgress !== 'function')) {
              _context.next = 22;
              break;
            }

            throw new TypeError('The `onDownloadProgress` option must be a function');

          case 22:
            if (supportsStreams) {
              _context.next = 24;
              break;
            }

            throw new Error('Streams are not supported in your environment. `ReadableStream` is missing.');

          case 24:
            return _context.abrupt("return", _this3._stream(response.clone(), _this3._options.onDownloadProgress));

          case 25:
            return _context.abrupt("return", response);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee8);
  }

  var fn = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(_callee8));

    return function fn() {
      return _ref.apply(this, arguments);
    };
  }();

  var isRetriableMethod = this._options.retry.methods.includes(this.request.method.toLowerCase());

  var result = isRetriableMethod ? this._retry(fn) : fn();

  var _loop = function _loop() {
    var _Object$entries2$_i = _Object$entries2[_i3],
        type = _Object$entries2$_i[0],
        mimeType = _Object$entries2$_i[1];
    result[type] = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var response;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this3.request.headers.set('accept', _this3.request.headers.get('accept') || mimeType);

              _context2.next = 3;
              return result;

            case 3:
              response = _context2.sent.clone();

              if (!(type === 'json')) {
                _context2.next = 13;
                break;
              }

              if (!(response.status === 204)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", '');

            case 7:
              if (!options.parseJson) {
                _context2.next = 13;
                break;
              }

              _context2.t0 = options;
              _context2.next = 11;
              return response.text();

            case 11:
              _context2.t1 = _context2.sent;
              return _context2.abrupt("return", _context2.t0.parseJson.call(_context2.t0, _context2.t1));

            case 13:
              return _context2.abrupt("return", response[type]());

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
  };

  for (var _i3 = 0, _Object$entries2 = Object.entries(responseTypes); _i3 < _Object$entries2.length; _i3++) {
    _loop();
  }

  return result;
}

function _calculateRetryDelay(error) {
  this._retryCount++;

  if (this._retryCount < this._options.retry.limit && !(error instanceof TimeoutError)) {
    if (error instanceof HTTPError) {
      if (!this._options.retry.statusCodes.includes(error.response.status)) {
        return 0;
      }

      var retryAfter = error.response.headers.get('Retry-After');

      if (retryAfter && this._options.retry.afterStatusCodes.includes(error.response.status)) {
        var after = Number(retryAfter);

        if (Number.isNaN(after)) {
          after = Date.parse(retryAfter) - Date.now();
        } else {
          after *= 1000;
        }

        if (typeof this._options.retry.maxRetryAfter !== 'undefined' && after > this._options.retry.maxRetryAfter) {
          return 0;
        }

        return after;
      }

      if (error.response.status === 413) {
        return 0;
      }
    }

    var BACKOFF_FACTOR = 0.3;
    return BACKOFF_FACTOR * Math.pow(2, this._retryCount - 1) * 1000;
  }

  return 0;
}

function _decorateResponse(response) {
  var _this4 = this;

  function _callee3$2(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.t0 = _this4._options;
          _context3.next = 3;
          return response.text();

        case 3:
          _context3.t1 = _context3.sent;
          return _context3.abrupt("return", _context3.t0.parseJson.call(_context3.t0, _context3.t1));

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  }

  function _callee9() {
    return regeneratorRuntime.wrap(_callee3$2, _callee9);
  }

  if (this._options.parseJson) {
    response.json = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(_callee9));
  }

  return response;
}

function _callee10(fn) {
  var ms, _iterator3, _step3, hook, hookResult;

  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return fn();

        case 3:
          return _context4.abrupt("return", _context4.sent);

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          ms = Math.min(this._calculateRetryDelay(_context4.t0), maxSafeTimeout);

          if (!(ms !== 0 && this._retryCount > 0)) {
            _context4.next = 23;
            break;
          }

          _context4.next = 12;
          return delay(ms);

        case 12:
          _iterator3 = _createForOfIteratorHelperLoose(this._options.hooks.beforeRetry);

        case 13:
          if ((_step3 = _iterator3()).done) {
            _context4.next = 22;
            break;
          }

          hook = _step3.value;
          _context4.next = 17;
          return hook({
            request: this.request,
            options: this._options,
            error: _context4.t0,
            retryCount: this._retryCount
          });

        case 17:
          hookResult = _context4.sent;

          if (!(hookResult === stop)) {
            _context4.next = 20;
            break;
          }

          return _context4.abrupt("return");

        case 20:
          _context4.next = 13;
          break;

        case 22:
          return _context4.abrupt("return", this._retry(fn));

        case 23:
          if (!this._options.throwHttpErrors) {
            _context4.next = 25;
            break;
          }

          throw _context4.t0;

        case 25:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee10, this, [[0, 6]]);
}

function _ref3() {
  var _retry2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(_callee10));

  function _retry(_x) {
    return _retry2.apply(this, arguments);
  }

  return _retry;
}

function _callee11() {
  var _iterator4, _step4, hook, _result;

  return regeneratorRuntime.wrap(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _iterator4 = _createForOfIteratorHelperLoose(this._options.hooks.beforeRequest);

        case 1:
          if ((_step4 = _iterator4()).done) {
            _context5.next = 13;
            break;
          }

          hook = _step4.value;
          _context5.next = 5;
          return hook(this.request, this._options);

        case 5:
          _result = _context5.sent;

          if (!(_result instanceof Request)) {
            _context5.next = 9;
            break;
          }

          this.request = _result;
          return _context5.abrupt("break", 13);

        case 9:
          if (!(_result instanceof Response)) {
            _context5.next = 11;
            break;
          }

          return _context5.abrupt("return", _result);

        case 11:
          _context5.next = 1;
          break;

        case 13:
          if (!(this._options.timeout === false)) {
            _context5.next = 15;
            break;
          }

          return _context5.abrupt("return", this._options.fetch(this.request.clone()));

        case 15:
          return _context5.abrupt("return", timeout(this.request.clone(), this.abortController, this._options));

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, _callee11, this);
}

function _ref4() {
  var _fetch2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(_callee11));

  function _fetch() {
    return _fetch2.apply(this, arguments);
  }

  return _fetch;
}

function _stream(response, onDownloadProgress) {
  var totalBytes = Number(response.headers.get('content-length')) || 0;
  var transferredBytes = 0;
  return new globalThis.Response(new globalThis.ReadableStream({
    start: function start(controller) {
      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var reader, read, _read;

        function _callee12() {
          var _yield$reader$read, done, value, percent;

          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _context6.next = 2;
                  return reader.read();

                case 2:
                  _yield$reader$read = _context6.sent;
                  done = _yield$reader$read.done;
                  value = _yield$reader$read.value;

                  if (!done) {
                    _context6.next = 8;
                    break;
                  }

                  controller.close();
                  return _context6.abrupt("return");

                case 8:
                  if (onDownloadProgress) {
                    transferredBytes += value.byteLength;
                    percent = totalBytes === 0 ? 0 : transferredBytes / totalBytes;
                    onDownloadProgress({
                      percent: percent,
                      transferredBytes: transferredBytes,
                      totalBytes: totalBytes
                    }, value);
                  }

                  controller.enqueue(value);
                  _context6.next = 12;
                  return read();

                case 12:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee12);
        }

        function _read4() {
          _read = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(_callee12));
          return _read.apply(this, arguments);
        }

        function _read5() {
          return _read.apply(this, arguments);
        }

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _read = _read4;
                read = _read5;
                reader = response.body.getReader();

                if (onDownloadProgress) {
                  onDownloadProgress({
                    percent: 0,
                    transferredBytes: 0,
                    totalBytes: totalBytes
                  }, new Uint8Array());
                }

                _context7.next = 6;
                return read();

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }))();
    }
  }));
}

var Ky = /*#__PURE__*/function () {
  var _proto = _Ky.prototype;
  _proto._calculateRetryDelay = _calculateRetryDelay;
  _proto._decorateResponse = _decorateResponse;
  _proto._retry = /*#__PURE__*/_ref3();
  _proto._fetch = /*#__PURE__*/_ref4()
  /* istanbul ignore next */
  ;
  _proto._stream = _stream;
  return _Ky;
}();

var validateAndMerge = function validateAndMerge() {
  for (var _len2 = arguments.length, sources = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    sources[_key2] = arguments[_key2];
  }

  for (var _i4 = 0, _sources2 = sources; _i4 < _sources2.length; _i4++) {
    var source = _sources2[_i4];

    if ((!isObject(source) || Array.isArray(source)) && typeof source !== 'undefined') {
      throw new TypeError('The `options` argument must be an object');
    }
  }

  return deepMerge.apply(void 0, [{}].concat(sources));
};

function _ref5(newDefaults) {
  return createInstance(validateAndMerge(newDefaults));
}

var createInstance = function createInstance(defaults) {
  var ky = function ky(input, options) {
    return new Ky(input, validateAndMerge(defaults, options));
  };

  var _loop2 = function _loop2() {
    var method = _step5.value;

    ky[method] = function (input, options) {
      return new Ky(input, validateAndMerge(defaults, options, {
        method: method
      }));
    };
  };

  for (var _iterator5 = _createForOfIteratorHelperLoose(requestMethods), _step5; !(_step5 = _iterator5()).done;) {
    _loop2();
  }

  ky.HTTPError = HTTPError;
  ky.TimeoutError = TimeoutError;
  ky.create = _ref5;

  ky.extend = function (newDefaults) {
    return createInstance(validateAndMerge(defaults, newDefaults));
  };

  ky.stop = stop;
  return ky;
};

var ky = createInstance();
var _default = ky;
exports.default = _default;
module.exports = exports.default;