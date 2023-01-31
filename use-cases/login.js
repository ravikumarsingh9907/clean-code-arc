module.exports = function executeLoginUser({ usersDb }) {
  return async function loginDetails({ md5, ...userCreadentials }) {
    const store = { ...userCreadentials };
    console.log(store);
    store.password = await md5(store.password);

    return await usersDb.loginUser({ ...store });
  };
};
