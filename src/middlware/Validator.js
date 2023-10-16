
const Joi = require('joi');

// Validation schema for user registration
const registrationSchema = Joi.object({
  username: Joi.string().required().trim(),
  password: Joi.string().required().trim(),
  email: Joi.string().email().required().trim()
});

// Validation schema for user login
const loginSchema = Joi.object({
  email: Joi.string().required().trim(),
  password: Joi.string().required().trim()
});


const updatePrefschema = Joi.object({
  newPrefs: Joi.array().items(Joi.string())
});


// Middleware to validate user registration data
function validateRegistration(req, res, next) {
  const { error } = registrationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

// Middleware to validate user login data
function validateLogin(req, res, next) {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}


function validateUpdate(req, res, next) {
  const { error } = updatePrefschema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}
module.exports = {
  validateRegistration,
  validateLogin,
  validateUpdate
};
