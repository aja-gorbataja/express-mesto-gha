const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');

router.use('/users', auth, userRouter);
router.use('/cards', auth, cardRouter);
router.use('/*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

module.exports = router;
