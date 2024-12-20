const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

Task.belongsTo(User, { foreignKey: "studentId", as: "student" });
User.hasMany(Task, { foreignKey: "studentId", as: "tasks" });

module.exports = Task;
