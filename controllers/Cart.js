'use strict';

var utils = require('../utils/writer.js');
var Cart = require('../service/CartService');

module.exports.cartBookDELETE = function cartBookDELETE (req, res, next) {
  var itemID = req.swagger.params['itemID'].value;
  var cartId = req.session.sessionId;
  if (isOffline(req)) {
    utils.writeJson(res, {error: "Access denied: authentication needed to proceed."}, 401);
  } else {
    Cart.cartBookDELETE(itemID, cartId)
      .then(function (response) {
        if (response instanceof Error) {
          utils.writeJson(res, response.message, response.code)
        } else {
          utils.writeJson(res, response, 204);
        }})
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  }
};

module.exports.cartBookPOST = function cartBookPOST (req, res, next) {
  var book = req.swagger.params['book'].value;
  var cartId = req.session.sessionId;
  if (isOffline(req)) {
    utils.writeJson(res, {error: "Access denied: authentication needed to proceed."}, 401);
  } else {
    Cart.cartBookPOST(book, cartId)
      .then(function (response) {
        if (response instanceof Error) {
          utils.writeJson(res, response.message, response.code)
        } else {
          utils.writeJson(res, response, 201);
        }})
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  }
};

module.exports.emptyCartPUT = function cartEmptyPUT (req, res, next) {
  var cartId = req.session.sessionId;
  if (isOffline(req)) {
    utils.writeJson(res, {error: "Access denied: authentication needed to proceed."}, 401);
  } else {
    Cart.emptyCartPUT(cartId)
      .then(function (response) {
        if (response instanceof Error) {
          utils.writeJson(res, response.message, response.code)
        } else {
          utils.writeJson(res, response, 204);
        }})
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  }
};

module.exports.userCartGET = function userCartGET (req, res, next) {
  var cartId = req.session.sessionId;
  if (isOffline(req)) {
    utils.writeJson(res, {error: "Access denied: authentication needed to proceed."}, 401);
  } else {
    Cart.userCartGET(cartId)
      .then(function (response) {
        if (response instanceof Error) {
          utils.writeJson(res, response.message, response.code)
        } else {
          utils.writeJson(res, response);
        }})
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  }
};

function isOffline(req) {
  return (!req.session || !req.session.loggedin)
}
