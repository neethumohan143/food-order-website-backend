const express = require('express')
const { getAllOrder, getOrderbyid, addOrder, updateOrder, deleteOrder, initOrder } = require('../controllers/orderControllers')
const router = express.Router()

router.get('/', getAllOrder)

  router.get('/:orderid',getOrderbyid )

  router.post('/',addOrder )

  router.patch('/:orderid',updateOrder )

  router.delete('/:orderid',deleteOrder )

  router.post('/initorder',initOrder)

module.exports = router