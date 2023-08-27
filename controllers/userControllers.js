const jwt = require("jsonwebtoken");
const { User } = require("../db/models/userModel");
const path = require("path");
const fs = require("fs/promises");
const gravatar = require("gravatar");

const { SECRET_KEY } = process.env;

// реєстрація
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({
      message: "Email in use",
    });
    return;
  }

  const avatar = gravatar.url(email);

  const newUser = new User({
    name,
    email,
    password,
    avatar,
  });

  await newUser.hashPassword(password);

  await newUser.save();

  const payload = { id: newUser._id };
  const token = jwt.sign(payload, SECRET_KEY);

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
    },
  });
};

const loginController = async (req, res) => {
  const { email, password} = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({
      message: "User wiht such email or password not fond",
    });
    return;
  }

  const result = await user.comparePassword(password);

  if (!result) {
    res.status(401).json({
      message: "User wiht such email or password not fond",
    });
    return;
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY);
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      name: user.name,
      email,
      avatar: user.avatar,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const currentUser = (req, res) => {
  const { name, email, avatar } = req.user;

  res.json({
    name,
    email,
    avatar,
  });
};

const updateAvatar = async(req,res) => {
  const {_id} = req.user;

  const { path: tmpUpload, originalname} = req.file;

  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(__dirname,"../", "public", "avatars", filename);

  await fs.rename(tmpUpload,resultUpload);

  const avatar = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, {avatar});

  res.json({
    avatar,
  })

}


module.exports = {
  signup,
  loginController,
  logout,
  currentUser,
  updateAvatar,
};
