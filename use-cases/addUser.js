const makeCreateUser = require("../entity");

module.exports.excuteAddUser = function ({ usersDb }) {
  return async function addUserDetails(userDetails) {
    const user = makeCreateUser(userDetails);
    const result = usersDb.addUser({
      name: user.getName(),
      email: user.getEmail(),
    });
    return result;
  };
};
