'use strict';

let sqlDb = require("./DataLayer.js").database;

/**
 * Delete an item from the cart
 * Delete the item itemId from the cart
 *
 * itemID Long ID of the item to remove
 * no response value expected for this operation
 **/
exports.cartBookDELETE = function(itemID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
};


/**
 * Insert a book into the cart
 *
 * book Book
 * no response value expected for this operation
 **/
exports.cartBookPOST = function(book) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
};


/**
 * Empty the cart
 *
 * no response value expected for this operation
 **/
exports.emptyCartPUT = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
};


/**
 * View the content of the cart
 *
 * cartId Long 
 * returns Cart
 **/
exports.userCartGET = function(cartId) {
  return sqlDb("cart")
    .where("owner_id", cartId)
    .then(content => {
      if (content.length === 0) {
        return "Your cart is empty."
      }
      else {
        return content.map()
        //TODO
      }
    })
};

