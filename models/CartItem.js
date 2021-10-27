const { DataTypes } = require('sequelize')
const Cart = require('./Cart')

module.exports = (sequelize) =>
  sequelize.define('CartItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product: {
      type: DataTypes.INTEGER
    },
    quantity: { type: DataTypes.INTEGER }
  })
