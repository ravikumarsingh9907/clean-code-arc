const express = require("express");
const dotenv = require("dotenv");
const user = require("./controllers");
const makeExpressCallback = require("./expressRequest");
require("./config");
dotenv.config();

const app = express();
app.use(express.json());

app.get("/oauth2callback", makeExpressCallback(user.authToken));
app.post(`/user/post`, makeExpressCallback(user.postUser));
app.get(`/user/getByEmail`, makeExpressCallback(user.getUser));
app.patch(`/user/update/:id`, makeExpressCallback(user.updateUser));
app.delete("/user/delete/:id", makeExpressCallback(user.deleteUser));
app.post("/user/login", makeExpressCallback(user.loginUser));

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

module.exports = app;
