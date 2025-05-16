const express = require('express')
const { getAlluser, getUserbyid, addUser, updateUser, deleteUser } = require('../controllers/userControllers')
const { upload } = require('../middlewares/multer')
const router = express.Router()

router.get('/', getAlluser)

router.get('/:userid', getUserbyid)

router.post('/',upload.single('image'), addUser)

router.patch('/:userid', upload.single('image'),updateUser)

router.delete('/:userid', deleteUser)

module.exports = router