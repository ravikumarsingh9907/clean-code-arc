module.exports = function makeGetUser({ user }) {
  return async function getUserByEmail(httpRequest) {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const posted = await user.getUser({
        email: `${httpRequest.body.email}`,
      });
      /*
      It will return queried data
      exp: [{
        id:"1234567654345676543",
        name: "Some Name",
        email: "someone@gmail.com"
      }]
      */
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
