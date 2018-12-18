'use strict';

exports.__esModule = true;

require('@babel/polyfill');

var _sendRequest = require('./sendRequest');

var _sendRequest2 = _interopRequireDefault(_sendRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var replaceWithPromises = function replaceWithPromises(obj, globalOptions) {
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
    var fn = _sendRequest2.default.bind(null, resolvedOptions);
    fn.getOptions = _sendRequest.getRequestOptions.bind(null, resolvedOptions);
    prev[k] = fn;
    return prev;
  }, {});
};

exports.default = function (resources) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var start = resources.toJS ? resources.toJS() : resources;
  return replaceWithPromises(start, options);
};

module.exports = exports.default;