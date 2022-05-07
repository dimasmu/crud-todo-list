'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  todo_items.init({
    id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
      autoIncrement : true
		},
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activity_group_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_active: DataTypes.INTEGER,
    priority: DataTypes.STRING,
    created_at : DataTypes.DATE,
    updated_at : DataTypes.DATE
  }, {
    sequelize,
    modelName: 'todoItems',
    tableName : 'todo_items',
    timestamps: false
  });
  return todo_items;
};