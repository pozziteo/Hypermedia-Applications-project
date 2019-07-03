'use strict';

let sqlDb = require("./DataLayer.js").database;
let Book = require("./BookService.js");
let lodash = require("lodash");

/**
 * Delete an item from the cart
 * Delete the item itemId from the cart
 *
 * itemID Long ID of the item to remove
 * no response value expected for this operation
 **/
exports.cartBookDELETE = function(itemID, cartId) {
  return sqlDb("cart")
    .where({
      book_id: itemID,
      owner_id: cartId
    })
    .then(raw => {
      if (lodash.isUndefined(raw)) {
        let error = new Error("The item wasn't in your cart");
        error.code = 400;
        throw error;
      } else {
        return sqlDb("cart")
          .where({
            book_id: itemID,
            owner_id: cartId
          }).del()
      }
    }).then((raws) => {
      return { success: "Book removed from your cart" }
    }).catch(error => {
      return error;
    })
};


/**
 * Insert a book into the cart
 *
 * book Book
 * no response value expected for this operation
 **/
exports.cartBookPOST = function(book, cartId) {
  return sqlDb("book")
    .where("code", book)
    .first()
    .then(dbBook => {
      if (lodash.isUndefined(dbBook)) {
        let error = new Error("Invalid book supplied");
        error.code = 409;
        throw error;
      }
      else
        return dbBook.code;
    }).then(code => {
      return sqlDb("cart")
        .insert({
          book_id: code,
          owner_id: cartId
        })
    }).then(() => {
      return { success: "Book inserted into your cart"}
    }).catch(error => {
      return error;
    })
};


/**
 * Empty the cart
 * Replace the content of the cart with an empty content
 *
 * no response value expected for this operation
 **/
exports.emptyCartPUT = function(cartId) {
  return sqlDb("cart")
    .where("owner_id", cartId)
    .del()
    .then((raws) => {
      return { success: "Removed " + raws + " items from your cart"}
    })
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
    .select("book_id")

    .then(content => {
      if (content.length === 0) {
        return { status: "Your cart is empty." }
      }
      else {
        content = content.map(el => {
          return el.book_id;
        });
        console.log(content);
        return buildCart(content)
      }
    }).catch(error => {
      return error;
    })
};


function buildCart(content) {
  let cart = {};

  let books = sqlDb("book")
    .whereIn("code", content)
    .then(books => {
      let map = books.map(book => {
        return Book.bookMapping(book)
      });
      return Promise.all(map);
    });

  let totalPrice = sqlDb("book")
    .whereIn("code", content)
    .sum("value as result")
    .then(value => {
      return value[0].result;
    });

  let currency = sqlDb("book")
    .whereIn("code", content)
    .first()
    .select("currency");

  return Promise.all([ books, totalPrice, currency ])
    .then(results => {
      cart.books = results[0];
      cart.total = { value: results[1], currency: results[2].currency };

      return cart;
    })
}
