const userRouter = require('express').Router();
const {
  getUsers, getUserById, updateUser, updateAvatar,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

userRouter.get('/', auth, getUsers);
userRouter.get('/:userId', auth, getUserById);
userRouter.patch('/me', auth, updateUser);
userRouter.patch('/me/avatar', auth, updateAvatar);

module.exports = userRouter;
