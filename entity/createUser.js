module.exports.buildMakeUser = function () {
  return function makeUser({ name, email } = {}) {
    return Object.freeze({
      getName: () => name,
      getEmail: () => email,
    });
  };
};
