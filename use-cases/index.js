const getTokens = require("./getAuthToken");
const excuteAddUser = require("./addUser");
const excuteGetUserByEmail = require("./getUserByEmail");
const excuteDeleteUser = require("./deleteUser");
const addUsersDb = require("../data-access");
const excuteUpdateUser = require("./updateUser");
const { oAuth2Client } = require("../config");
const usersDb = addUsersDb;

const userAdded = excuteAddUser({ usersDb });
const getUser = excuteGetUserByEmail({ usersDb });
const getToken = getTokens({ oAuth2Client });
const userUpdated = excuteUpdateUser({ usersDb });
const userDeleted = excuteDeleteUser({ usersDb });

const userService = Object.freeze({
  userAdded,
  getUser,
  getToken,
  userUpdated,
  userDeleted,
});

module.exports = userService;
