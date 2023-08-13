const express = require("express");

const usersRouter = express.Router();

const authentificate = require("../middlewares/authentificate");

const {
  signup,
  loginController,
  logout,
  currentUser,
} = require("../controllers/userControllers");

const {
  signupSchema,
  validateBody,
  loginSchema,
} = require("../middlewares/userValidator");

usersRouter.post("/signup", validateBody(signupSchema), signup);

usersRouter.post("/login", validateBody(loginSchema), loginController);

usersRouter.post("/logout", authentificate, logout);

usersRouter.get("/current", authentificate, currentUser);

module.exports = usersRouter;
