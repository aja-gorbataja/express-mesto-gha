const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());

app.use(express.json());

app.use(router);
app.post('/signin', login);
app.post('/signup', createUser);
app.use(errors());
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).send({ message: status === 500 ? 'На сервере произошла ошибка' : message });
  next();
});
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.listen(PORT);
