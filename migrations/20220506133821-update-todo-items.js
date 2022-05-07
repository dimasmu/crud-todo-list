'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('todo_items', 'priority', {
          type: Sequelize.DataTypes.ENUM('very-high', 'high', 'normal', 'low', 'very-low'),
          defaultValue: 'very-high',
          allowNull: true,
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
