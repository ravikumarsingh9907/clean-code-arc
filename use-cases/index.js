const { excuteAddUser } = require("./addUser");
const { excuteGetUserByEmail } = require("./getUserByEmail");
const addUsersDb = require("../data-access");
const usersDb = addUsersDb;

const userAdded = excuteAddUser({ usersDb });
const getUser = excuteGetUserByEmail({ usersDb });

const userService = Object.freeze({
  userAdded,
  getUser,
});

module.exports = userService;
