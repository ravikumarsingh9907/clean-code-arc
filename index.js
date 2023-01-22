const express = require("express");
const dotenv = require("dotenv");
const user = require("./controllers");
const { getTokens, generateConfig, oAuth2Client } = require("./config");
const { makeExpressCallback } = require("./expressRequest");
require("./config");
dotenv.config();

const app = express();
app.use(express.json());

app.get("/oauth2callback", makeExpressCallback(user.authToken));
app.post(`/user/post/:email`, makeExpressCallback(user.postUser));
app.get(`/user/getByEmail`, makeExpressCallback(user.getUser));

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

module.exports = app;
