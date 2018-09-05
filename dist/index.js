'use strict';

exports.__esModule = true;

var _sendRequest = require('./sendRequest');

var _sendRequest2 = _interopRequireDefault(_sendRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const replaceWithPromises = (obj, globalOptions) => Object.entries(obj).reduce((prev, [k, v]) => {
  if (!v.path || !v.method) {
    prev[k] = replaceWithPromises(v, globalOptions);
    return prev;
  }
  const resolvedOptions = Object.assign({
    url: v.path,
    method: v.method
  }, globalOptions);
  const fn = _sendRequest2.default.bind(null, resolvedOptions);
  fn.getOptions = _sendRequest.getRequestOptions.bind(null, resolvedOptions);
  prev[k] = fn;
  return prev;
}, {});

exports.default = (resources, options = {}) => {
  const start = resources.toJS ? resources.toJS() : resources;
  return replaceWithPromises(start, options);
};

module.exports = exports['default'];