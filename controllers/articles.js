const Article = require('../models/article');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => {
      if (article.length === 0) {
        throw new NotFoundError('Статьи не найдены');
      }
      res.send({ data: article });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Неверный ID юзера'));
      }
      next(err);
    });
};

const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;

  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((article) => res.status(201).send({ data: article }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      }
      next(err);
    });
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .then((article) => {
      if (!article) {
        throw new NotFoundError('Статья не найдена');
      } else if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError('У вас недостаточно прав');
      } else {
        Article.findByIdAndRemove(req.params.articleId)
          .then((result) => {
            if (!result) {
              throw new NotFoundError('Статья не найдена');
            }
            res.send({ data: result });
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
