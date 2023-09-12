import { Router } from 'express';
import {
  userLogin,
  userRegistration,
  userForgotPassword,
  userResetPassword,
} from '../controllers/userController.js';
import { check } from 'express-validator';
import { userRegistrationValidatationSchema } from '../validation/user.validation.js';

const router = Router();

router.post('/register', userRegistrationValidatationSchema, userRegistration);

router.post('/login', userRegistrationValidatationSchema, userLogin);

router.post(
  '/forgot-password',
  [check('email').isEmail().normalizeEmail()],
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
