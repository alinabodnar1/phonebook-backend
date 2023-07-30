const express = require("express");

const usersRouter = express.Router();

const { signup, loginController } = require("../controllers/userControllers");

const {
  signupSchema,
  validateBody,
  loginSchema,
} = require("../middlewares/userValidator");

usersRouter.post("/signup", validateBody(signupSchema), signup);

usersRouter.post("/login", validateBody(loginSchema), loginController);

usersRouter.post("/logout");

usersRouter.get("/current");

module.exports = usersRouter;
