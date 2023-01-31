const md5 = require("md5");
const userService = require("../use-cases");
const makePostUser = require("./postUser");
const makeGetUser = require("./getUser");
const makeUpdateUser = require("./updateUser");
const makeDeleteUser = require("./deleteUser");
const makeLoginUser = require("./login");
const getAuthToken = require("./getAuthToken");
const user = userService;

const postUser = makePostUser({ user, md5 });
const getUser = makeGetUser({ user });
const authToken = getAuthToken({ user });
const updateUser = makeUpdateUser({ user });
const deleteUser = makeDeleteUser({ user });
const loginUser = makeLoginUser({ user, md5 });

const userController = Object.freeze({
  postUser,
  getUser,
  authToken,
  updateUser,
  deleteUser,
  loginUser,
});

module.exports = userController;
