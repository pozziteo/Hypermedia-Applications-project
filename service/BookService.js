'use strict';

const lodash = require("lodash");
let sqlDb = require("./DataLayer.js").database;

/**
 * Find reviews of a book
 * Returns all reviews of the book with id bookId
 *
 * bookId Long ID of the book to find reviews about
 * returns List
 **/
exports.bookReviewsGET = function(bookId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


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
        return bookMapping(e);
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
  if (!Number.isInteger(bookId)) {
    let error = new Error("Bad request: invalid ID supplied");
    error.code = 400;
    throw error;
  }

  return sqlDb("book")
    .where( {
      code: bookId
    }).first()
    .then(book => {
      if (book.length === 0) {
        let error = new Error("Book not found");
        error.code = 404;
        throw error;
      }
      else
        return book;
    }).then(book => {
      return bookMapping(book);
    }).catch(error => {
      return error;
    })
};


/**
 * Find books similar to bookId
 * Returns a list of book
 *
 * bookId Long ID of book to find similar
 * returns List
 */
exports.getSimilarBooks = function(bookId) {
  if (!Number.isInteger(bookId)) {
    let error = new Error("Bad request. invalid ID supplied");
    error.code = 400;
    throw error;
  }

  return exports.getBookById(bookId)
    .then(book => {
      return sqlDb("book")
        .where({
          genre: book.genre,
          theme: book.theme
        })
        .andWhereNot("code", book.code)
    }).then(similar => {
      return similar.map(book => {
        return bookMapping(book);
      })
    }).catch(error => {
      return error;
    })
};


function bookMapping(book) {
  book.price = {value: book.value, currency: book.currency};
  book.status = book.available === true ? "available": "out of stock";
  delete book.value;
  delete book.currency;
  delete book.available;
  return book;
}