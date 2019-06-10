'use strict';

var utils = require('../utils/writer.js');
var Backend = require('../service/BackendService');

module.exports.sourceGET = function sourceGET (req, res, next) {
  Backend.sourceGET()
    .then(function (response) {
      utils.sendZip(res, response)
    })
    .catch(function(response) {
      utils.writeJson(res, response)
    })
};
