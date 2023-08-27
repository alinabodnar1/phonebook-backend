const express = require("express");

const usersRouter = express.Router();

const authentificate = require("../middlewares/authentificate");

const upload = require('../middlewares/upload');

const {
  signup,
  loginController,
  logout,
  currentUser,
  updateAvatar,
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

usersRouter.patch('/avatar', authentificate, upload.single("avatar"), updateAvatar);

module.exports = usersRouter;
