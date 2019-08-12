//Validation
const Joi = require("@hapi/joi");

const registerValidation = data => {
  const validationSchema = {
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, validationSchema);
};
const loginValidation = data => {
  const validationSchema = {
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, validationSchema);
};

module.exports = {
  registerValidation,
  loginValidation
};
