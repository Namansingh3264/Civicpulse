const Joi = require('joi');

function validate(schema, property = 'body') {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], { abortEarly: false, stripUnknown: true });
    if (error) return res.status(400).json({ success: false, message: 'Validation error', details: error.details });
    req[property] = value;
    next();
  };
}
module.exports = { validate, Joi };