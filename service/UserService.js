'use strict';

//IMPORTANT:
//Password in database must be of at least 60 characters or bcrypting will fail

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
  return sqlDb("users")
    .where("username", username)
    .then(user => {
      if (user) {
        let userpw = sqlDb("users").select("password").where("username", username);
        if (bcrypt.compareSync(password, userpw))
          return { user };
      }
      console.log("Wrong username or password.");
    })
};


/**
 * Register
 * Register into the store
 *
 * body User 
 * no response value expected for this operation
 **/
exports.userRegisterPOST = function(body) {
  let biggerId = sqlDb("users").max("id");
  let usernames = sqlDb("users").select("username");
  let emails = sqlDb("users").select("email");

  if (emails.contains(body.email)) {
    console.log("The e-mail you inserted is already in use");
    return;
  }

  if (usernames.contains(body.username)) {
    console.log("The username you inserted is already in use");
    return;
  }

  return sqlDb("users")
    .insert({
      id: (biggerId + 1),
      username: body.username,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10)
    })
};


