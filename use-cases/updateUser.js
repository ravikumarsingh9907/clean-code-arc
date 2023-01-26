module.exports = function excuteUpdateUser({ usersDb }) {
  return async function updateUserDetails({ userId, ...updateDetails } = {}) {
    return await usersDb.updateUser({
      userId,
      ...updateDetails,
    });
  };
};
