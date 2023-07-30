const jwt = require('jsonwebtoken');
const {User} = require('../db/models/userModel');

const {SECRET_KEY} = process.env;

// реєстрація
const signup = async(req,res) =>{
  const {name, email, password} = req.body;
  
  const user = await User.findOne({email});

  if(user){
    res.status(409).json({
      message: "Email in use",
    })
    return;
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  await newUser.hashPassword(password);

  await newUser.save();

  const payload = {id: newUser._id}
  const token = jwt.sign(payload, SECRET_KEY);

  await User.findByIdAndUpdate(newUser._id, {token});

  res.status(201).json({
    token,
    user: {
      name: newUser.name,
      email: newUser.email,
    },
  });
}

module.exports = {
  signup,
}