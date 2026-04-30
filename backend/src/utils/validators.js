const { body, param } = require('express-validator');

// Validation rules
const userRegistrationValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name must be at most 100 characters'),

  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscore'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).withMessage('Invalid email format'),

  // 🔥 FIX: biar "" dianggap tidak ada
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\+?[0-9\s-]{7,15}$/)
    .withMessage('Invalid phone number format'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/)
    .withMessage('Password must be at least 10 characters and include uppercase, lowercase, number, and special character'),
];

const userUpdateValidation = [
  body('id')
    .isInt().withMessage('User ID must be an integer'),

  body('name')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Name must be at most 100 characters'),

  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 }).withMessage('Username must be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscore'),

  body('email')
    .optional()
    .trim()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).withMessage('Invalid email format'),

  // 🔥 FIX juga di update biar konsisten
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\+?[0-9\s-]{7,15}$/)
    .withMessage('Invalid phone number format'),

  body('password')
    .optional()
    .trim()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/)
    .withMessage('Password must be at least 10 characters and include uppercase, lowercase, number, and special character'),

  body('balance')
    .optional()
    .isInt({ min: 0 }).withMessage('Balance must be a non-negative integer'),
];

const transactionCreationValidation = [
  body('user_id')
    .isInt().withMessage('User ID must be an integer'),

  body('item_id')
    .isInt().withMessage('Item ID must be an integer'),

  body('quantity')
    .isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),

  body('description')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 }).withMessage('Description must be at most 500 characters'),
];

const transactionIdValidation = [
  param('id')
    .isInt().withMessage('Transaction ID must be an integer'),
];

const validate = (req, res, next) => {
  const errors = require('express-validator').validationResult(req);

  if (!errors.isEmpty()) {
    console.log("VALIDATION ERROR:", errors.array()); // 🔥 debug

    const messages = errors.array().map(err => err.msg);
    return res.status(400).json({
      success: false,
      message: messages.join('. '),
      payload: null,
    });
  }

  next();
};

module.exports = {
  userRegistrationValidation,
  userUpdateValidation,
  transactionCreationValidation,
  transactionIdValidation,
  validate,
};