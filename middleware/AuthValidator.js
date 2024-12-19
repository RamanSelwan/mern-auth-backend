const Joi = require('joi'); // Import Joi library for validation

// Signup Validation Function
const signupValidation = (req, res, next) => {
  // Joi schema for signup validation
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(), // Name must be between 3-100 characters
    email: Joi.string().email().required(),       // Email must be a valid email
    password: Joi.string().min(4).max(100).required() // Password: 4-100 characters
  });

  // Validate request body against the schema
  const { error } = schema.validate(req.body);
  
  // If there's a validation error, respond with 400 and error message
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }
  
  // If validation passes, continue to the next middleware
  next();
};

// Login Validation Function
const loginValidation = (req, res, next) => {
  // Joi schema for login validation
  const schema = Joi.object({
    email: Joi.string().email().required(),       // Email must be a valid email
    password: Joi.string().min(4).max(100).required() // Password: 4-100 characters
  });

  // Validate request body against the schema
  const { error } = schema.validate(req.body);

  // If there's a validation error, respond with 400 and error message
  if (error) {
    return res.status(400).json({ message: "Bad request", error });
  }

  // If validation passes, continue to the next middleware
  next();
};

// Export both validation functions
module.exports = {
  signupValidation,
  loginValidation
};
