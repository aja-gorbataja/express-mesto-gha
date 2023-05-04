const failRouter = require('express').Router();

failRouter.get('/*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

module.exports = failRouter;
