'use strict';

let sqlDb = require("./DataLayer.js").database;

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

