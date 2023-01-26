module.exports = function deletUser({ usersDb }) {
  return async function ({ userId }) {
    try {
      return await usersDb.deleteUser({ userId });
    } catch (e) {
      return e.message;
    }
  };
};
