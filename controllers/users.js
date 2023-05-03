const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь не найден'})
      } else {
        res.send({ data: user })}
      })
    .catch(err => res.status(500).send({ message: err.message }));
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => {
      if (err.name === ValidationError) {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' })
      } else {
      res.status(500).send({ message: err.message })
      }
  });
}

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
      .then(user => res.send({ data: user }))
      .catch(err => {
        if (err.name === ValidationError) {
          res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' })
        } else {
        res.status(500).send({ message: err.message })
        }
    });
}

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
      .then(user => res.send({ data: user }))
      .catch(err => {
        if (err.name === ValidationError) {
          res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' })
        } else {
        res.status(500).send({ message: err.message })
        }
    });
}