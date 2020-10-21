const express = require('express');
const { getUser } = require('../controllers/user');

const userRouter = express.Router();

userRouter.get('/me', getUser);

module.exports = userRouter;
