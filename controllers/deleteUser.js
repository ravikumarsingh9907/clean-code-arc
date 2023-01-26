module.exports = function makeDeleteUser({ user }) {
  return async function (httpRequest) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const posted = await user.userDeleted({
        userId: `${httpRequest.params.id}`,
      });

      if (!posted) throw new Error(posted);

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
