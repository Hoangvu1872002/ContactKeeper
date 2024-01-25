var express = require('express');
const { userRegister, authLogin, userPull, getUserProfile, updateUserProfile, deleteUser } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');
var router = express.Router();

router.post('/', userRegister);

router.post('/login', authLogin);

router.get('/userpull', protect, userPull);

router.put('/profile', protect, updateUserProfile );

router.delete('/delete', protect, deleteUser );

// router.get('/profile', protect, getUserProfile);

module.exports = router;
