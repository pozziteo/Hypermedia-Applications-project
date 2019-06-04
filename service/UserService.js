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
  let fetchedUser;

  return sqlDb("customer")
    .where("username", username)
    .first()
    .then(user => {
      if (user.length !== 0) {
        fetchedUser = user;
        return sqlDb("customer").select("password").where("username", username).first()
      }
      else throw new Error("Wrong username or password");
    })
    .then(pw => {
      return bcrypt.compare(password, pw.password)
    }).then(check => {
      if (check === true)
        return fetchedUser;
      else throw new Error("Wrong username or password");
    })
    .catch(error => {
      error.code = 401;
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
  return sqlDb("customer").select("email")
    .then(emailsObj => {
      return emailsObj.map(obj => {
        return obj.email;
      })
    })
    .then(emails => {
      if (lodash.includes(emails, email)) {
        throw new Error("The e-mail you inserted is already in use");
      } else {
        return sqlDb("customer").select("username")
      }
    })
    .then(usernamesObj => {
      return usernamesObj.map(obj => {
        return obj.username;
      })
    })
    .then(usernames => {
      if (lodash.includes(usernames, username)) {
        throw new Error("The username you inserted is already in use");
      } else {
        return sqlDb("customer")
          .insert({
            email: email,
            password: bcrypt.hashSync(password, 10),
            username: username
          })
      }
    }).then(() => {
      return {
        success: "registration successful"
      }
    })
    .catch(error => {
      error.code = 409;
      return error;
    })
};


