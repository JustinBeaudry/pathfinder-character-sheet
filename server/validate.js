'use strict';

module.exports = (decoded, request, callback) => {
  callback(null, true, {
    user: {}
  });
};