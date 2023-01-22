module.exports.makeGetUser = function ({ user }) {
  return async function getUserByEmail(httpRequest) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const posted = await user.getUser({
        email: `'${httpRequest.body.email}'`,
      });
      return {
        headers,
        statusCode: 200,
        body: posted,
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
