const { Sequelize } = require("sequelize");

// Create a Sequelize instance with environment variables from Docker
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Host from Docker environment
    port: process.env.DB_PORT, // Port from Docker environment
    dialect: "postgres", // Database dialect
    logging: false, // Disable SQL query logs
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

module.exports = sequelize;