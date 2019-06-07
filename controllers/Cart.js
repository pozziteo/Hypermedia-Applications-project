'use strict';

var utils = require('../utils/writer.js');
var Cart = require('../service/CartService');

module.exports.cartBookDELETE = function cartBookDELETE (req, res, next) {
  var itemID = req.swagger.params['itemID'].value;
  Cart.cartBookDELETE(itemID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.cartBookPOST = function cartBookPOST (req, res, next) {
  var book = req.swagger.params['book'].value;
  Cart.cartBookPOST(book)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.emptyCartPUT = function cartEmptyPUT (req, res, next) {
  Cart.emptyCartPUT()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

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
