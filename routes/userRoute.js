import { Router } from 'express';
import {
  userLogin,
  userRegistration,
  userForgotPassword,
  userResetPassword,
} from '../controllers/userController.js';
import { check, checkSchema } from 'express-validator';
import { userDataValidateSchemaBased } from '../validation/user.validation.js';
// import authenticateToken from '../middleware/userAuth.js';

const router = Router();

router.post(
  '/register',
  checkSchema(userDataValidateSchemaBased),
  userRegistration
);

router.post(
  '/login',
  [check('username').trim().escape(), check('password').trim()],
  userLogin
);

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
