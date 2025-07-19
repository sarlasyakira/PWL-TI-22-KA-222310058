const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.chat = require("./chat")(sequelize, DataTypes);
db.users = require("./users")(sequelize, DataTypes);

module.exports = db;
