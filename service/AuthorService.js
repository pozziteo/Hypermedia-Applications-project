'use strict';

const lodash = require("lodash");
let sqlDb = require("./DataLayer.js").database;

/**
 * Authors who wrote a book available in the store
 * List of authors of books available in the inventory
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * book Integer Filter authors who wrote the given book. (optional)
 * returns List
 **/
exports.authorsGET = function(offset, limit, book) {
    let subQuery = sqlDb("books")
        .where("id", book);

    return sqlDb("authors")
      .offset(offset)
      .limit(limit)
      .modify(builder => {
          if (!lodash.isUndefined(book))
              return builder.whereIn("id", subQuery)
      })
};


/**
 * Find author by ID
 * Returns an author
 *
 * authorId Long ID of author to return
 * returns Author
 **/
exports.getAuthorById = function(authorId) {
  return sqlDb("authors")
      .where({
          id: authorId
      })
};

