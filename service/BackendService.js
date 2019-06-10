'use strict';


/**
 * Zip file with source code
 * Returns a zip file containing the source code of the application
 *
 * returns File
 **/
exports.sourceGET = function() {
  return new Promise((resolve, reject) => {
    resolve("./other_stuff/app.zip");
  });
};

