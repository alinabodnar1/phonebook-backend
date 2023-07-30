const Joi = require("joi");

const signupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validateBody = (schema) => {
  const funcValidate = (req,res,next) => {
    console.log(schema);
    const {error} = schema.validate(req.body);
    console.log(error);

    if (error){
      res.status(400).json({
        message: error.message,
      });
    }
    next();
  }
  return funcValidate;
}

module.exports = {
  validateBody,
  signupSchema,
}
