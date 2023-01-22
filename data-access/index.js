require("dotenv").config();
const { makeAddUserDb } = require("./make-db");
const { Sequelize } = require("sequelize-cockroachdb");
const sequelize = new Sequelize(process.env.DB_URL);

async function makeDb() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

const addUserDb = makeAddUserDb({ makeDb, sequelize });

module.exports = addUserDb;
