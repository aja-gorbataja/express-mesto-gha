const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64524fd0953eb9e27998acb3',
  };
  next();
});

app.use(router);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.listen(PORT);
