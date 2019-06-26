'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.userLoginPOST = function userLoginPOST (req, res, next) {
  var username = req.swagger.params['username'].value;
  var password = req.swagger.params['password'].value;
  if (req.session.loggedin) {
    utils.writeJson(res, { error: "You are already logged in" }, 409);
  } else {
    User.userLoginPOST(username, password)
      .then(function (response) {
        if (response instanceof Error) {
          utils.writeJson(res, {error: response.message}, response.code);
        } else {
          req.session = {
            loggedin: true,
            sessionId: response.user_id
          };
          utils.writeJson(res, response);
        }
      }).catch(function (response) {
      utils.writeJson(res, response);
    });
  }
};

module.exports.userLogoutPOST = function userLogoutPOST (req, res, next) {
  if (!req.session.loggedin) {
    utils.writeJson(res, { error: "You are not logged in" }, 409)
  }
  else {
    req.session = null;
    User.userLogoutPOST()
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  }
};

module.exports.userRegisterPOST = function userRegisterPOST (req, res, next) {
  var email = req.swagger.params['email'].value;
  var username = req.swagger.params['username'].value;
  var password = req.swagger.params['password'].value;
  User.userRegisterPOST(email, username, password)
    .then(function (response) {
      if (response instanceof Error) {
        utils.writeJson(res, { error: response.message }, response.code);
      } else {
        utils.writeJson(res, response);
      }})
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
