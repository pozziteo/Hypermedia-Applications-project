'use strict';

var utils = require('../utils/writer.js');
var Cart = require('../service/CartService');

module.exports.userCartGET = function userCartGET (req, res, next) {
  var cartId = req.session.sessionId;
  if (!req.session || !req.session.loggedin) {
    utils.writeJson(res, {error: "Access denied: authentication needed to proceed."}, 401);
  } else {
    Cart.userCartGET(cartId)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  }
};
