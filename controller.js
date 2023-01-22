const axios = require("axios");
const { generateConfig, oAuth2Client } = require("./config");
const fs = require("fs");
require("dotenv").config();

async function getUser(req, res) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/messages`;

    const { token } = await oAuth2Client.getAccessToken();

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    response.data.messages.forEach(async (data) => {
      const dataId = data.id;
      const url = `https://gmail.googleapis.com//gmail/v1/users/${req.params.email}/messages/${dataId}`;
      const { token } = await oAuth2Client.getAccessToken();

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const storeData = await response.data;

      storeData.payload.headers.forEach((ele) => {
        if (ele.name === "From") {
        }
      });
    });
    res.send(finalData);
  } catch (error) {
    res.send(error);
  }
}

async function getDrafts(req, res) {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = generateConfig(url, token);
    const response = await axios(config);
    res.send(response.data);
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function readMail(req, res) {
  try {
    const url = `https://gmail.googleapis.com//gmail/v1/users/ravikumarsingh9907@gmail.com/messages/${req.params.messageId}`;
    const { token } = await oAuth2Client.getAccessToken();

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.data;

    res.send(data);
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  getUser,
  getDrafts,
  readMail,
};
