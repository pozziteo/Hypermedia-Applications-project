'use strict';

var utils = require('../utils/writer.js');
var Event = require('../service/EventService');

module.exports.eventsGET = function eventsGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  var book = req.swagger.params['book'].value;
  var author = req.swagger.params['author'].value;
  Event.eventsGET(offset,limit,book,author)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getEventById = function getEventById (req, res, next) {
  var eventId = req.swagger.params['eventId'].value;
  Event.getEventById(eventId)
    .then(function (response) {
      if (response instanceof Error) {
        utils.writeJson(res, { error: response.message }. response.code);
      } else {
        utils.writeJson(res, response);
      }
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
