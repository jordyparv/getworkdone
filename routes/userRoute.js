import { Router } from 'express';
import {
  userLogin,
  userRegistration,
  userForgotPassword,
  userResetPassword,
} from '../controllers/userController.js';
import { check } from 'express-validator';
import {
  userRegistrationValidationSchema,
  userForgotPasswordValidationSchema,
} from '../validation/user.validation.js';

const router = Router();

router.post('/register', userRegistrationValidationSchema, userRegistration);

router.post('/login', userRegistrationValidationSchema, userLogin);

router.post(
  '/forgot-password',
  userForgotPasswordValidationSchema,
  userForgotPassword
);
router.post(
  '/reset-password',
  [
    check('email').isEmail().normalizeEmail(),
    check('resetToken').trim(),
    check('newPassword').isLength({ min: 8 }).trim(),
  ],
  userResetPassword
);

export default router;
