require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
// НАСТРОИТЬ КОРС!!!
// const cors = require('cors');
const { userRouter, articlesRouter } = require('./routes');
const auth = require('./middlewares/auth');
const { validateUser, validateLogin } = require('./middlewares/validator');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/user');
const NotFoundError = require('./errors/NotFoundError');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();
// app.use(cors({ origin: true }));

app.use(helmet());
// app.use(cors({
//   origin: [
//     'http://localhost:3000',
//     'https://localhost:3000',
//     // проверить / Пока не настроено!!!
//     'https://rashidovD.github.io/news-explorer-frontend/',
//   ],
//   credentials: true,
// }));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'слишком много запросов, повторите запрос позже',
});

app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateUser, createUser);

app.use('/users', auth, userRouter);
app.use('/articles', auth, articlesRouter);
app.use(() => {
  throw new NotFoundError({ message: 'Запрашиваемый ресурс не найден' });
});
app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send(err.message);
    return;
  }
  res.status(500).send({ message: `Ошибка на сервере: ${err.message}` });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
