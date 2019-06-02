'use strict';

const lodash = require("lodash");
let booksFind = require("./BookService.js");
let sqlDb = require("./DataLayer.js").database;

/**
 * Events organized by the store
 * List of events organized by the store
 *
 * offset Integer Pagination offset. Default is 0. (optional)
 * limit Integer Maximum number of items per page. Default is 20 and cannot exceed 500. (optional)
 * book Integer Filter events where given book is presented (optional)
 * author Integer Filter events presented by an author (optional)
 * returns List
 **/
exports.eventsGET = function(offset, limit, book, author) {

  return sqlDb("event")
    .offset(offset)
    .limit(limit)
    .where(builder => {
      if (!lodash.isUndefined(book))
        builder.where("book_id", book);
      if (!lodash.isUndefined(author))
        builder.whereIn("book_id", () => {
          return sqlDb("books")
            .select("code")
            .where("author_ID", author);
        });
    })
};


/**
 * Find event by ID
 * Returns an event
 *
 * eventId Long ID of event to return
 * returns Event
 **/
exports.getEventById = function(eventId) {
  if (!Number.isInteger(eventId)) {
    let error = new Error("Bad request: invalid ID supplied");
    error.code = 400;
    throw error;
  }

  return sqlDb("event")
    .where({
      event_id: eventId
    }).first()
    .then(event => {
      if (event.length === 0) {
        let error = new Error("Event not found");
        error.code = 404;
        throw error;
      }
      else
        return event;
    })
    .catch(error => {
      return error;
    })
};

