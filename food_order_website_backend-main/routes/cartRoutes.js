const express = require('express')
const { getAllCart, getCartbyid, addCart, updateCart, deleteCart } = require('../controllers/cartControllers')
const router = express.Router()

router.get('/', getAllCart)

  router.get('/:cartid',getCartbyid )

  router.post('/',addCart )

  router.patch('/:cartid',updateCart )

  router.delete('/:cartid',deleteCart )

module.exports = router