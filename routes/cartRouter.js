const { Cart, CartItem } = require('../db').models

const router = require('express').Router()

router.get('/', async (req, res) => {
  const carts = await Cart.findAll({ include: 'items' })
  return res.json(carts)
})

router.post('/', async (req, res) => {
  const { items } = req.body
  if (!items || !items?.length) return res.status(404).send('BAD REQUEST')
  const cart = await Cart.create({}, { include: 'items' })
  const cartItems = await CartItem.bulkCreate(items)
  await cart.addItems(cartItems)
  await cart.reload()
  return res.json(cart)
})

router.patch('/:id', async (req, res) => {
  const cart = await Cart.findByPk(req.params.id, { include: 'items' })
  if (!cart) return res.status(404).send('Not found')
  const { items } = req.body
  if (!items || !items?.length) return res.status(404).send('BAD REQUEST')
  await CartItem.destroy({
    where: {
      id: cart.items.map((cartItem) => cartItem.id)
    }
  })
  const cartItems = await CartItem.bulkCreate(items)
  await cart.addItems(cartItems)
  await cart.reload()
  return res.json(cart)
})

router.delete('/:id', async (req, res) => {
  const cart = await Cart.findByPk(req.params.id)
  if (!cart) return res.status(404).send('Not found')
  await cart.destroy()
  return res.json(cart)
})

module.exports = router
