module.exports = function makeAddUserDb({ makeDb, sequelize }) {
  return Object.freeze({
    addUser,
    findByEmail,
    updateUser,
    deleteUser,
    loginUser,
  });

  async function addUser({ ...userDetails }) {
    await makeDb();
    const store = { ...userDetails };

    const columns = Object.keys(store);
    const values = Object.values(store).map((value) => `'${value}'`);
    const insertData = `INSERT INTO customers (${columns}) VALUES (${values});`;

    sequelize.query(insertData);
  }

  async function findByEmail({ email }) {
    try {
      await makeDb();
      const getQuery = `SELECT * FROM users WHERE email='${email}'`;
      const [getUser, metadata] = await sequelize.query(getQuery);
      if (getUser.length === 0) {
        throw new Error("No data found");
      }
      return getUser;
    } catch (e) {
      return e.message;
    }
  }

  async function updateUser({ userId, hashPass, ...updateDetails }) {
    try {
      await makeDb();

      const getQuery = `SELECT * FROM users WHERE user_id='${userId}'`;
      const [gotUser, metadata] = await sequelize.query(getQuery);

      if (!gotUser) throw new Error("Wrong query");

      if (gotUser.length === 0) {
        throw new Error("No user found with given id");
      }

      const store = { ...updateDetails };
      console.log(store);
      const data = Object.entries(store).flat();

      let result = "";
      data.forEach((ele, index) => {
        if (index % 2 === 0 || index === 0) {
          result += ele + "=";
        } else if (index % 2 !== 0) {
          if (index === data.length - 1) {
            result += `'${ele}'`;
          } else {
            result += `'${ele}',`;
          }
        }
      });

      const query = `UPDATE users SET ${result},password='${hashPass}' WHERE user_id='${userId}'`;
      return await sequelize.query(query);
    } catch (error) {
      return error.message;
    }
  }

  async function deleteUser({ userId }) {
    try {
      await makeDb();

      const getQuery = `SELECT * FROM users WHERE user_id='${userId}'`;
      const [gotUser, metadata] = await sequelize.query(getQuery);

      if (!gotUser) throw new Error("Wrong query");

      if (gotUser.length === 0) {
        throw new Error("No user found with given id");
      }

      const query = `DELETE from users WHERE user_id='${userId}'`;
      const deleteUser = await sequelize.query(query);

      if (!deleteUser) throw new Error("Wrong Query");

      return deleteUser;
    } catch (e) {
      return e.message;
    }
  }

  async function loginUser({ ...userCredentials }) {
    try {
      await makeDb();
      const store = { ...userCredentials };
      const findByEmail = `SELECT * FROM customers WHERE email='${store.email}'`;
      const [userFound, metadata] = await sequelize.query(findByEmail);

      if (userFound.length === 0) {
        throw new Error("Incorrect Email or password");
      }
      console.log(userFound);

      if (store.password !== userFound[0].password) {
        throw new Error("Incorrect Email or password");
      }

      return userFound;
    } catch (e) {
      return e.message;
    }
  }
};
