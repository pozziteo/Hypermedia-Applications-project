'use strict';

//IMPORTANT:
//Password in database must be of at least 60 characters or bcrypting will fail

const lodash = require("lodash");
const bcrypt = require("bcrypt");
let sqlDb = require("./DataLayer.js").database;

/**
 * Login
 * Login with a form
 *
 * username String 
 * password String 
 * no response value expected for this operation
 **/
exports.userLoginPOST = function(username, password) {
  return sqlDb("customer")
    .where("username", username)
    .then(user => {
      if (user) {
        return sqlDb("customer").select("password").where("username", username)
          .then( pw => {
            if (bcrypt.compareSync(password, pw))
              return { user };
          })
      }
      console.log("Wrong username or password.");
    }).catch(error => {
      return error;
    })
};


/**
 * Register
 * Register into the store
 *
 * body User 
 * no response value expected for this operation
 **/
exports.userRegisterPOST = function(email, username, password) {
  return sqlDb("customer").select("email").then(emails => {
    if (lodash.includes(emails, email)) {
      console.log("The e-mail you inserted is already in use");
    } else {
      return sqlDb("customer").select("username").then(usernames => {
        if (lodash.includes(usernames, username)) {
          console.log("The username you inserted is already in use");
        } else {
          return sqlDb("customer")
            .insert({
              email: email,
              password: bcrypt.hashSync(password, 10),
              username: username
            })
        }
      })
    }
  }).catch(error => {
    return error;
  })
};


