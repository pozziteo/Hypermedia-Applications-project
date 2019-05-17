'use strict';


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
exports.booksGET = function(offset,limit,author,genre,theme) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 0,
  "title" : "Il deserto dei tartari",
  "authors" : [ "Dino Buzzati" ],
  "genres" : [ "fiction" ],
  "themes" : [ "self-deception" ],
  "copies" : 3,
  "price" : {
    "value" : 10,
    "currency" : "eur"
  },
  "status" : "available"
}, {
  "id" : 0,
  "title" : "Il deserto dei tartari",
  "authors" : [ "Dino Buzzati" ],
  "genres" : [ "fiction" ],
  "themes" : [ "self-deception" ],
  "copies" : 3,
  "price" : {
    "value" : 10,
    "currency" : "eur"
  },
  "status" : "available"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find book by ID
 * Returns a book
 *
 * bookId Long ID of book to return
 * returns Book
 **/
exports.getBookById = function(bookId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 0,
  "title" : "Il deserto dei tartari",
  "authors" : [ "Dino Buzzati" ],
  "genres" : [ "fiction" ],
  "themes" : [ "self-deception" ],
  "copies" : 3,
  "price" : {
    "value" : 10,
    "currency" : "eur"
  },
  "status" : "available"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

