const path = require('path');

module.exports = function override(config) {
  // resolve.extensions에 .ts, .tsx 추가
  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
