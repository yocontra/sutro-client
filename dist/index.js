"use strict";

exports.__esModule = true;

require("core-js/modules/es.weak-map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

exports.default = void 0;

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.object.assign.js");

var _combineUrl = _interopRequireDefault(require("./combineUrl"));

exports.combineUrl = _combineUrl.default;

var _sendRequest = _interopRequireWildcard(require("./sendRequest"));

var _ky = _interopRequireDefault(require("./ky"));

exports.request = _ky.default;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var replaceWithPromises = function replaceWithPromises(obj, globalOptions) {
  if (globalOptions === void 0) {
    globalOptions = {};
  }

  return Object.entries(obj).reduce(function (prev, _ref) {
    var k = _ref[0],
        v = _ref[1];

    if (!v.path || !v.method) {
      prev[k] = replaceWithPromises(v, globalOptions);
      return prev;
    }

    var resolvedOptions = Object.assign({
      url: v.path,
      method: v.method
    }, globalOptions);

    var fn = _sendRequest.default.bind(null, resolvedOptions);

    fn.getOptions = _sendRequest.getRequestOptions.bind(null, resolvedOptions);
    prev[k] = fn;
    return prev;
  }, {});
};

var _default = replaceWithPromises;
exports.default = _default;