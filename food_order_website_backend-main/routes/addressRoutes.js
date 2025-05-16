const express = require('express')
const { getAllAddress, getAddressbyid, addAddress, updateAddress, deleteAddress } = require('../controllers/addressControllers')
const router = express.Router()

router.get('/', getAllAddress)

  router.get('/:addressid',getAddressbyid )

  router.post('/',addAddress )

  router.patch('/:addressid',updateAddress )

  router.delete('/:addressid',deleteAddress )

  module.exports = router