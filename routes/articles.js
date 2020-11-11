const router = require('express').Router();
const { validateArticleId, validateArticleBody } = require('../middlewares/validator');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', validateArticleBody, createArticle);
router.delete('/:articleId', validateArticleId, deleteArticle);

module.exports = router;
