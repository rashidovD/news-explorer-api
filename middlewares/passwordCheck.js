const BadRequestError = require('../errors/BadRequestError');

const passwordCheck = (req, res, next) => {
  const { password } = req.body;
  if (password.trim()) {
    next();
  } else {
    next(new BadRequestError('Заполните поле "password"'));
  }
};

module.exports = passwordCheck;
