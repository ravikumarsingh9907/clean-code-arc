module.exports.makeAddUserDb = function ({ makeDb, sequelize }) {
  return Object.freeze({
    addUser,
    findByEmail,
  });

  async function addUser({ ...userDetails }) {
    await makeDb();
    const store = { ...userDetails };

    const columns = Object.keys(store);
    const values = Object.values(store).map((value) => `'${value}'`);
    const insertData = `INSERT INTO USERS (${columns}) VALUES (${values});`;

    const userCreated = await sequelize.query(insertData);

    const get = `SELECT * FROM users`;
    const [getUser, metadata] = await sequelize.query(get);
  }

  async function findByEmail({ email }) {
    await makeDb();
    const getQuery = `SELECT * FROM users WHERE email=${email}`;
    const [getUser, metadata] = await sequelize.query(getQuery);
    if (getUser.length === 0) {
      return null;
    }

    return getUser;
  }
};
