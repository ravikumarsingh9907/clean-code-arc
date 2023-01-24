const axios = require("axios");
const { oAuth2Client } = require("../config");
const userService = require("../use-cases");
const makePostUser = require("./postUser");
const makeGetUser = require("./getUser");
const getAuthToken = require("./getAuthToken");
const user = userService;

const postUser = makePostUser({ user, oAuth2Client, axios });
const getUser = makeGetUser({ user });
const authToken = getAuthToken({ user });

const userController = Object.freeze({
  postUser,
  getUser,
  authToken,
});

module.exports = userController;
