const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());

app.use(express.json());

app.use(router);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
app.use(errors());
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).send({ message: status === 500 ? 'На сервере произошла ошибка' : message });
  next();
});
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.listen(PORT);
