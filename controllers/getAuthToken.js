module.exports = function getAuthToken({ user }) {
  return async function getToken(httpRequest) {
    try {
      await user.getToken(httpRequest.query.code);

      /*
      It will return data from query string
      code="accesstoken"
      */
      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: httpRequest.query.code,
      };
    } catch (e) {
      /*
      It will return error if any occur while fetching query string value
      */
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
