'use strict';

let sqlDb = require("./DataLayer.js").database;

/**
 * Themes treated by books
 * List of themes the books treat
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * returns List
 **/
exports.themesGET = function(offset,limit) {
  return sqlDb("theme")
    .limit(limit)
    .offset(offset);
};

