const express = require("express");
const dotenv = require("dotenv");
const user = require("./controllers");
const controllers = require("./controller");
const { getTokens, generateConfig, oAuth2Client } = require("./config");
const { makeExpressCallback } = require("./expressRequest");
require("./config");
dotenv.config();

const app = express();
app.use(express.json());

app.get("/oauth2callback", async (req, res) => {
  await getTokens(req.query.code);
  res.send(req.query.code);
});

app.get("/mail/user/:email", controllers.getUser);
app.get("/mail/drafts/:email", controllers.getDrafts);
app.get("/mail/read/:messageId", controllers.readMail);

app.post(`/user/post`, makeExpressCallback(user.postUser));
app.get(`/user/getByEmail`, makeExpressCallback(user.getUser));

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

module.exports = app;
