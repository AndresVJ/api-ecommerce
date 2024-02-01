const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ProductCart = sequelize.define('modelName', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //userID
    //productId
});

module.exports = ProductCart;