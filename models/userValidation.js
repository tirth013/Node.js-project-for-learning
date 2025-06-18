const Joi = require('joi');

const userValidationSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': 'Please add the user name',
    'any.required': 'Please add the user name',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please add a valid email',
    'string.empty': 'Please add email',
    'any.required': 'Please add email',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Please add password',
    'any.required': 'Please add password',
  }),
});

module.exports = userValidationSchema;