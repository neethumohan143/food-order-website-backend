const express = require('express')
const { getAllMenu, getMenubyid, addMenu, updateMenu, deleteMenu } = require('../controllers/menuControllers')
const { checkadmin } = require('../middlewares/checkAdmin')
const { upload } = require('../middlewares/multer')
const router = express.Router()

router.get('/',getAllMenu)

  router.get('/:menuid',getMenubyid )

  router.post('/',upload.single("image"),addMenu )

  router.patch('/:menuid',upload.single("image"),updateMenu )

  router.delete('/:menuid',deleteMenu )

module.exports = router