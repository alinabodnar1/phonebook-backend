const express = require('express');

const usersRouter = express.Router();

const {signup} = require('../controllers/userControllers');

const {signupSchema, validateBody} = require('../middlewares/userValidator');

usersRouter.post('/signup', validateBody(signupSchema), signup);

usersRouter.post('/login');

usersRouter.post('/logout');

usersRouter.get('/current');

module.exports = usersRouter;