'use strict';

const lodash = require("lodash");
let sqlDb = require("./DataLayer.js").database;

/**
 * Find best-sellers books
 * Returns all books which are best-sellers
 *
 * returns List
 */
exports.bookBestSellersGET = function() {
  return sqlDb("best-sellers")
    .join("book", "best-sellers.book_id", "book.code")
    .then(books => {
      let map = books.map(book => {
        return exports.bookMapping(book);
      });

      return Promise.all(map);
    })
};

/**
 * Find our favourites books
 * Returns all books which are our favourites
 *
 * returns List
 */
exports.bookFavouritesGET = function() {
  return sqlDb("favourites")
    .join("book", "favourites.book_id", "book.code")
    .then(books => {
      let map = books.map(book => {
        return exports.bookMapping(book);
      });

      return Promise.all(map);
    })
};

/**
 * Find reviews of a book
 * Returns all reviews of the book with id bookId
 *
 * bookId Long ID of the book to find reviews about
 * returns List
 **/
exports.bookReviewsGET = function(bookId) {
  if (!Number.isInteger(bookId)) {
    let error = new Error("Bad request: invalid ID supplied");
    error.code = 400;
    throw error;
  }

  return sqlDb("review")
    .where("book_id", bookId)
};


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
  return sqlDb("written")
    .join("book", "written.book_id", "book.code")
    .where(builder => {
      if (!lodash.isUndefined(author))
        builder.where("written.author_id", author);
      if (!lodash.isUndefined(genre))
        builder.where("book.genre", genre);
      if (!lodash.isUndefined(theme))
        builder.where("book.theme", theme);
    }).distinct("code", "title", "description", "value", "publisher",
      "binding", "genre", "theme", "available", "series", "currency")
    .then(data => {
      let map = data.map(e => {
        return exports.bookMapping(e);
      });

      return Promise.all(map);
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

  return sqlDb("written")
    .join("book", "written.book_id", "book.code")
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
      return exports.bookMapping(book);
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
      return sqlDb("written")
        .join("book", "written.book_id", "book.code")
        .where({
          genre: book.genre,
          theme: book.theme
        })
        .andWhereNot("book.code", book.code)
        .distinct("code", "title", "description", "value", "publisher",
          "binding", "genre", "theme", "available", "series", "currency")
    }).then(similar => {
      let map = similar.map(book => {
        return exports.bookMapping(book);
      });

      return Promise.all(map);
    }).catch(error => {
      return error;
    })
};


exports.bookMapping = function (book) {
  let bookAuthors = sqlDb("author")
    .join("written", "author.author_id", "written.author_id")
    .where("written.book_id", book.code)
    .then(authors => {
      return authors.map(author => {
        return { name: author.name, biography: author.biography }
      })
    });

  let price = {value: book.value, currency: book.currency};
  let status = book.available === true ? "available": "out of stock";

  return Promise.all([ bookAuthors, price, status ])
    .then(results => {
      book.authors = results[0];
      book.price = results[1];
      book.status = results[2];
      delete book.book_id;
      delete book.name;
      delete book.biography;
      delete book.author_id;
      delete book.value;
      delete book.currency;
      delete book.available;

      return book;
    })
};