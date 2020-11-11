const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Заполните поле "keyword"'],
  },
  title: {
    type: String,
    required: [true, 'Заполните поле "title"'],
  },
  text: {
    type: String,
    required: [true, 'Заполните поле "text"'],
  },
  date: {
    type: String,
    required: [true, 'Заполните поле "date"'],
  },
  source: {
    type: String,
    required: [true, 'Заполните поле "source"'],
  },
  link: {
    type: String,
    required: [true, 'Заполните поле "link"'],
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Некорректно заполнено поле "link"',
    },
  },
  image: {
    type: String,
    required: [true, 'Заполните поле "image"'],
    validate: {
      validator(image) {
        return validator.isURL(image);
      },
      message: 'Некорректно заполнено поле "image"',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Заполните поле "owner"'],
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
