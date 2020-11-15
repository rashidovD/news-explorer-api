require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const handleError = require('./middlewares/handleError');
const { PORT, DB } = require('./config');
const limiter = require('./middlewares/rateLimiter');

const app = express();

mongoose.connect(`mongodb://localhost:27017/${DB}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://rashidov.students.nomoreparties.co',
    'http://rashidov.students.nomoreparties.co',
  ],
  credentials: true,
}));
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT);
