const userService = require("../use-cases");
const { makePostUser } = require("./postUser");
const { makeGetUser } = require("./getUser");

const user = userService;

const postUser = makePostUser({ user });
const getUser = makeGetUser({ user });

const userController = Object.freeze({
  postUser,
  getUser,
});

module.exports = userController;
