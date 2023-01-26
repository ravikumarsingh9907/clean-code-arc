const axios = require("axios");
const { oAuth2Client } = require("../config");
const userService = require("../use-cases");
const makePostUser = require("./postUser");
const makeGetUser = require("./getUser");
const makeUpdateUser = require("./updateUser");
const makeDeleteUser = require("./deleteUser");
const getAuthToken = require("./getAuthToken");
const user = userService;

const postUser = makePostUser({ user, oAuth2Client, axios });
const getUser = makeGetUser({ user });
const authToken = getAuthToken({ user });
const updateUser = makeUpdateUser({ user });
const deleteUser = makeDeleteUser({ user });

const userController = Object.freeze({
  postUser,
  getUser,
  authToken,
  updateUser,
  deleteUser,
});

module.exports = userController;
