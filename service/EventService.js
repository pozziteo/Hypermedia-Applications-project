'use strict';


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
exports.eventsGET = function(offset,limit,book,author) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 0,
  "title" : "Buzzati Grand Tour",
  "date" : "2019-24-10T10:00:00Z",
  "place" : "Piazza Leonardo da Vinci 1 Milano",
  "book" : {
    "id" : 0,
    "title" : "Il deserto dei tartari",
    "author" : "Dino Buzzati",
    "price" : {
      "value" : 10,
      "currency" : "eur"
    },
    "status" : "available"
  }
}, {
  "id" : 0,
  "title" : "Buzzati Grand Tour",
  "date" : "2019-24-10T10:00:00Z",
  "place" : "Piazza Leonardo da Vinci 1 Milano",
  "book" : {
    "id" : 0,
    "title" : "Il deserto dei tartari",
    "author" : "Dino Buzzati",
    "price" : {
      "value" : 10,
      "currency" : "eur"
    },
    "status" : "available"
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Find event by ID
 * Returns an event
 *
 * eventId Long ID of event to return
 * returns Event
 **/
exports.getEventById = function(eventId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 0,
  "title" : "Buzzati Grand Tour",
  "date" : "2019-24-10T10:00:00Z",
  "place" : "Piazza Leonardo da Vinci 1 Milano",
  "book" : {
    "id" : 0,
    "title" : "Il deserto dei tartari",
    "author" : "Dino Buzzati",
    "price" : {
      "value" : 10,
      "currency" : "eur"
    },
    "status" : "available"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

