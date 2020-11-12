const jwt = require('jsonwebtoken');
const UnauthError = require('../errors/UnauthError');
const { JWT_SECRET } = require('../config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    next(new UnauthError('Необходима авторизация'));
  }
  req.user = payload;
  next();
};

module.exports = auth;
