const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const router = require('./routes/routes');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(router);
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).send({ message: status === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT);
