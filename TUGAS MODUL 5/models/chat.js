module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define("chat", {
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Chat;
};
