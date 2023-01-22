module.exports.getAuthToken = function ({ getTokens }) {
  return async function getToken(httpRequest) {
    try {
      await getTokens(httpRequest.query.code);

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
        body: httpRequest.query.code,
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
