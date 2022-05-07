'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('todo_items', 'created_at', {
        type: Sequelize.DATE,
        allowNull: true
      }),
      queryInterface.addColumn('todo_items', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: true
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
