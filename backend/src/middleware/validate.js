import { body, param, query, validationResult } from 'express-validator';

export function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}

export const validateRegistration = [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain uppercase, lowercase, and number'),
  handleValidation,
];

export const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required'),
  handleValidation,
];

export const validateMessage = [
  body('text').trim().isLength({ min: 1, max: 2000 }).withMessage('Message must be 1-2000 characters'),
  handleValidation,
];

export const validateQuiz = [
  body('answers').isArray({ min: 1 }).withMessage('At least one answer required'),
  handleValidation,
];

export const validateReport = [
  body('userId').notEmpty().withMessage('User ID required'),
  body('reportedUserId').notEmpty().withMessage('Reported user ID required'),
  body('reason').trim().isLength({ min: 1, max: 200 }).withMessage('Reason must be 1-200 characters'),
  handleValidation,
];

export const validateCheckout = [
  body('plan').isIn(['free', 'premium', 'vip']).withMessage('Valid plan required (free, premium, vip)'),
  body('region').trim().notEmpty().withMessage('Region required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  handleValidation,
];

export const validateModerationCheck = [
  body('text').trim().isLength({ min: 1, max: 5000 }).withMessage('Text must be 1-5000 characters'),
  handleValidation,
];

export const validateProfileUpdate = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 characters'),
  body('bio').optional().trim().isLength({ max: 500 }).withMessage('Bio must be under 500 characters'),
  handleValidation,
];
