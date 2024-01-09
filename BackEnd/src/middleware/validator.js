const { body, validationResult } = require('express-validator');

const validateUserInput = [
    body('name')
    .notEmpty().withMessage('Name is required')
    .matches(/^[^0-9]+$/).withMessage('Name cannot contain numbers'),

    body('user_name')
    .notEmpty().withMessage('User name is required'),


    body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address'),

    body('role')
    .notEmpty().withMessage('role is required'),


    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
      .withMessage('Password must contain at least one uppercase letter, one special character, and one number'),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];


  module.exports = validateUserInput