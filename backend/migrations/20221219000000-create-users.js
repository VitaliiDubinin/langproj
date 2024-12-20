module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Users", {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        role: {
          type: Sequelize.ENUM("teacher", "student"),
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("NOW()"),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("NOW()"),
        },
      });
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("Users");
    },
  };
  