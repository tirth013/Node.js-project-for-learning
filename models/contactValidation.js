const Joi = require('joi');

const contactValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Please add the contact name',
    'any.required': 'Please add the contact name',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please add a valid email',
    'string.empty': 'Please add email',
    'any.required': 'Please add email',
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'Please add phone number',
    'any.required': 'Please add phone number',
  }),
});

module.exports = contactValidationSchema;