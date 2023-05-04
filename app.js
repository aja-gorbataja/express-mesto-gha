const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const failRouter = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64524fd0953eb9e27998acb3',
  };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('/*', failRouter);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.listen(PORT);
