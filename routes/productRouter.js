const { default: axios } = require('axios')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const { data } = await axios.get('https://fakestoreapi.com/products')
  res.json(data)
})

module.exports = router
