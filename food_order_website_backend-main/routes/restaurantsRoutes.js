const express = require('express')
const { addRestuarants, getAllRestuarants, getRestuarantsbyid, updateRestuarants, deleteRestuarants } = require('../controllers/restaurantsControllers')
const { checkadmin } = require('../middlewares/checkAdmin')
const { upload } = require('../middlewares/multer')
const router = express.Router()

router.get('/', getAllRestuarants)

  router.get('/:restaurantsid',getRestuarantsbyid )

  router.post('/',upload.single("image"),addRestuarants )

  router.patch('/:restaurantsid',upload.single("image"),updateRestuarants )

  router.delete('/:restaurantsid',deleteRestuarants )

module.exports = router