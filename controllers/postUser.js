module.exports = function makePostUser({ user, oAuth2Client, axios }) {
  return async function postUser(httpRequest) {
    try {
      const paramEmail = httpRequest.params.email;
      const posted = await user.userAdded({ oAuth2Client, axios, paramEmail });
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: "data added",
      };
    } catch (e) {
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
};
