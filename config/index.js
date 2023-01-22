const axios = require("axios");
const { google } = require("googleapis");
require("dotenv").config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.RE_URI
);

const scopes = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://mail.google.com/",
];

const url = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: scopes,
});

console.log(url);

async function getTokens(code) {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
}

module.exports = {
  getTokens,
  oAuth2Client,
};
