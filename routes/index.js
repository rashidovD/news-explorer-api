const router = require('express').Router();
const { login, createUser } = require('../controllers/user');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const articlesRouter = require('./articles');
const passwordCheck = require('../middlewares/passwordCheck');
const { validateUserBody, validateAuthentication } = require('../middlewares/validator');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', validateUserBody, passwordCheck, createUser);
router.post('/signin', validateAuthentication, passwordCheck, login);
router.use(auth);
router.use('/users', userRouter);
router.use('/articles', articlesRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('К сожалению, запрашиваемый ресурс не найден'));
});

module.exports = router;
