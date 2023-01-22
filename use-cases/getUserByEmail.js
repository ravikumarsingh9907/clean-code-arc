module.exports.excuteGetUserByEmail = function ({ usersDb }) {
  return async function getUserDetail({ email } = {}) {
    if (!email) {
      throw new Error("You must give a email id.");
    }

    const result = usersDb.findByEmail({ email });
    return result;
  };
};
