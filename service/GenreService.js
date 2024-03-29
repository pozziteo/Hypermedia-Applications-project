'use strict';

let sqlDb = require("./DataLayer").database;

/**
 * Literary genres of books
 * List of literary genres the books belong to
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/
exports.genresGET = function(offset,limit) {
  return sqlDb("genre")
    .limit(limit)
    .offset(offset);

};

