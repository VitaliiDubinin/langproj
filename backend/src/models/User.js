// const { Sequelize, DataTypes } = require("sequelize");
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: "postgres",
// });

// const User = sequelize.define("User", {
//   email: { type: DataTypes.STRING, allowNull: false, unique: true },
//   password: { type: DataTypes.STRING, allowNull: false },
//   role: { type: DataTypes.ENUM("teacher", "student"), allowNull: false },
// });

// sequelize
//   .sync({ force: false }) // Use force: true only if you want to drop and recreate tables
//   .then(() => console.log("Database synchronized"))
//   .catch((err) => console.error("Error synchronizing database:", err));

// module.exports = User;

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Validate that the email is in the correct format
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM("teacher", "student"),
    allowNull: false,
  },
});

// Add associations in a separate method to avoid duplication
User.associate = (models) => {
  User.hasMany(models.Task, { foreignKey: "studentId", as: "tasks" }); // User-Task association
};

module.exports = User;


