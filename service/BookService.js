'use strict';

const lodash = require("lodash");
let sqlDb = require("./DataLayer.js").database;

/**
 * Books available in the inventory
 * List of books available in the inventory
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * author Integer Filter list of books by author (optional)
 * genre String Filter list of books about the same genre (optional)
 * theme String Filter list of books which treat the same theme (optional)
 * returns List
 **/
exports.booksGET = function(offset, limit, author, genre, theme) {
  let authorsQuery = sqlDb("written")
    .where("author_id", author)
    .select("book_id");

  return sqlDb("book")
    .limit(limit)
    .offset(offset)
    .where(builder => {
      if (!lodash.isUndefined(author))
        builder.whereIn("code", authorsQuery);
      if (!lodash.isUndefined(genre))
        builder.where("genre", genre);
      if (!lodash.isUndefined(theme))
        builder.where("theme", theme);
    }).then(data => {
      return data.map(e => {
        e.price = {value: e.value, currency: e.currency};
        e.status = e.available === true ? "available": "out of stock";
        delete e.value;
        delete e.currency;
        delete e.available;
        return e;
      })
    })
};


/**
 * Find book by ID
 * Returns a book
 *
 * bookId Long ID of book to return
 * returns Book
 **/
exports.getBookById = function(bookId) {
  return sqlDb("book")
    .where( {
      code: bookId
    }).first()
    .then(book => {
      book.price = {value: book.value, currency: book.currency};
      book.status = book.available === true ? "available": "out of stock";
      delete book.value;
      delete book.currency;
      delete book.available;
      return book;
    })
};
