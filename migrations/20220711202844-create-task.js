'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('task', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      description:{
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      },
      deadline:{
        type: Sequelize.DataTypes.DATE,
        allowNull: true,
      },
      status:{
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      TodoId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'todos',
          key: 'id',
          as: 'todoId',
        },
        onDelete: 'CASCADE'
      },
      UserId:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'id',
          as: 'userId',
        },
        onDelete: 'CASCADE'
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('task');
  }
};
