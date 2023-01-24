module.exports = function getTokens({ oAuth2Client }) {
  return async function (code) {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
  };
};
