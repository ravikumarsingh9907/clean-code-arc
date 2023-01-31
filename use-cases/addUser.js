module.exports = function excuteAddUser({ usersDb }) {
  return async function addUserDetails({ md5, ...userDetails }) {
    const store = { ...userDetails };
    store.password = await md5(store.password);
    return await usersDb.addUser({ ...store });
  };
};
