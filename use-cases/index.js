const getTokens = require("./getAuthToken");
const excuteAddUser = require("./addUser");
const excuteGetUserByEmail = require("./getUserByEmail");
const addUsersDb = require("../data-access/index.js");
const { oAuth2Client } = require("../config");
const usersDb = addUsersDb;

const userAdded = excuteAddUser({ usersDb });
const getUser = excuteGetUserByEmail({ usersDb });
const getToken = getTokens({ oAuth2Client });

const userService = Object.freeze({
  userAdded,
  getUser,
  getToken,
});

module.exports = userService;
