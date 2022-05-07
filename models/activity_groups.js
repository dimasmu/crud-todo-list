'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activity_groups extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  activity_groups.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false
    },
    email: DataTypes.STRING,
    created_at : DataTypes.DATE,
    updated_at : DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    modelName: 'activityGroup',
    tableName : 'activity_groups'
  });
  return activity_groups;
};