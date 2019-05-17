'use strict';

var utils = require('../utils/writer.js');
var Book = require('../service/BookService');

module.exports.booksGET = function booksGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  var author = req.swagger.params['author'].value;
  var genre = req.swagger.params['genre'].value;
  var theme = req.swagger.params['theme'].value;
  Book.booksGET(offset,limit,author,genre,theme)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getBookById = function getBookById (req, res, next) {
  var bookId = req.swagger.params['bookId'].value;
  Book.getBookById(bookId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
