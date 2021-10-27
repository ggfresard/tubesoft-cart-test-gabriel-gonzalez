const { Sequelize } = require('sequelize')
const { Client } = require('pg')
const client = new Client({
  connectionString: process.env.DATABASE_PRIMARY_URL
})
client.connect()

client.query('CREATE DATABASE ' + 'tubesoft_cart', function (err) {
  console.log('Database created')
  client.end() // close the connection
})

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres'
})

const Cart = require('./models/Cart')(sequelize)
const CartItem = require('./models/CartItem')(sequelize)

Cart.hasMany(CartItem, { foreignKey: 'cart', as: 'items' })
CartItem.belongsTo(Cart, { foreignKey: 'cart' })

module.exports = sequelize
