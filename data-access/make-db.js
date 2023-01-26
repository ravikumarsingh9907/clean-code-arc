module.exports = function makeAddUserDb({ makeDb, sequelize }) {
  return Object.freeze({
    addUser,
    findByEmail,
    updateUser,
    deleteUser,
  });

  async function addUser({ ...userDetails }) {
    await makeDb();
    const store = { ...userDetails };

    const columns = Object.keys(store);
    const values = Object.values(store).map((value) => `'${value}'`);
    const insertData = `INSERT INTO USERS (${columns}) VALUES (${values});`;

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

      /*
    It will throw query data from database on given condition
    EXP: email = "someone123@gmail.com"
    [
      {
      id: "123456",
      name: "Ravi Kumar",
      email: "someone123@gmail.com"
     },
     {
      id: "9876554",
      name: "Ravi Kumar",
      email: "someone123@gmail.com"
     }
     ...
     ...
    ] 
    */
      return getUser;
    } catch (e) {
      return e.message;
    }
  }

  async function updateUser({ userId, ...updateDetails }) {
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

      const query = `UPDATE users SET ${result} WHERE user_id='${userId}'`;
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
};
