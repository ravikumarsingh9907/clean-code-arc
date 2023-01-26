module.exports = function makeUpdateUser({ user }) {
  return async function updateUserById(httpRequest) {
    try {
      const { source = {}, ...userInfo } = httpRequest.body;
      source.ip = httpRequest.ip;
      source.browser = httpRequest.headers["User-Agent"];
      if (httpRequest.headers["Referer"]) {
        source.referrer = httpRequest.headers["Referer"];
      }

      const posted = await user.userUpdated({
        userId: httpRequest.params.id,
        ...userInfo,
      });

      return {
        headers: {
          "Content-Type": "application/json",
        },
        statusCode: 201,
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
