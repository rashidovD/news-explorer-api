const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Введите корректный email')
      .messages({
        'any.required': 'Заполните поле email',
        'string.empty': 'Заполните поле email',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Заполните поле пароля',
        'string.empty': 'Заполните поле пароля',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Заполните поле name',
        'string.empty': 'Заполните поле name',
        'string.min': 'Минимальная длина name 2',
        'string.max': 'Максимальная длина name 30',
      }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Введите корректный email')
      .messages({
        'any.required': 'Заполните поле email',
        'string.empty': 'Заполните поле email',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Заполните поле password',
        'string.empty': 'Заполните поле password',
      }),
  }),
});

const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'any.required': 'Заполните поле keyword',
        'string.empty': 'Заполните поле keyword',
      }),
    title: Joi.string().required()
      .messages({
        'any.required': 'Заполните поле title',
        'string.empty': 'Заполните поле title',
      }),
    text: Joi.string().required()
      .messages({
        'any.required': 'Заполните поле text',
        'string.empty': 'Заполните поле text',
      }),
    date: Joi.string().required()
      .messages({
        'any.required': 'Заполните поле date',
        'string.empty': 'Заполните поле date',
      }),
    source: Joi.string().required()
      .messages({
        'any.required': 'Заполните поле source',
        'string.empty': 'Заполните поле source',
      }),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Некорректный URL-адрес');
    })
      .messages({
        'any.required': 'Заполните поле link',
        'string.empty': 'Заполните поле link',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Некорректный URL-адрес');
    })
      .messages({
        'any.required': 'Заполните поле image',
        'string.empty': 'Заполните поле image',
      }),
  }),
});

const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Некорректный ID');
    }),
  }),
});

module.exports = {
  validateUserBody,
  validateAuthentication,
  validateArticleBody,
  validateArticleId,
};
