const userRouter = require('express').Router();
const {
  getUsers, getUserById, getUser, updateUser, updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.get('/me', getUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
