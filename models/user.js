const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthError = require('../errors/UnauthError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Заполните поле "email"'],
    unique: [true, 'Введите уникальный "email"'],
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: [true, 'Заполните поле "password"'],
    // minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: [true, 'Заполните поле "name"'],
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthError({ message: 'Неверные email или password' });
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthError({ message: 'Неверные email или password' });
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
