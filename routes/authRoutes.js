const express = require('express');
const { createUser, loginUserCntroller, getAllUsers, getSingleUsers, deleteUser, updateUser, blockUser, unBlockuser, hendlerRefreshToken } = require('../controller/userController');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUserCntroller);
router.get('/all-users', getAllUsers);
router.get('/refresh', hendlerRefreshToken);
router.get('/:id', authMiddleware, isAdmin, getSingleUsers);
router.delete('/:id', deleteUser);
router.put('/edit-user', authMiddleware, updateUser);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unBlockuser);

module.exports = router 
