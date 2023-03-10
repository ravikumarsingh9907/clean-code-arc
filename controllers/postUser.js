module.exports = function makePostUser({ user, md5 }) {
  return async function postUser(httpRequest) {
    try {
      const { ...userInfo } = httpRequest.body;
      const paramEmail = httpRequest.params.email;
      const posted = await user.userAdded({ md5, ...userInfo });
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
