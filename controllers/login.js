module.exports = function makeLoginUser({ user, md5 }) {
  return async function loginUser(httpRequest) {
    try {
      console.log(httpRequest);
      const { ...userCredentials } = httpRequest.body;
      const posted = await user.loggingUser({ md5, ...userCredentials });
      return {
        headers: {
          "Content-Type": "application/json",
        },
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
