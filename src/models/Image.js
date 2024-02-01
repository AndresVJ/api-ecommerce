const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Image = sequelize.define('image', {
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // product ID
});

module.exports = Image;