import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 5000;
export const mongoURI = process.env.NONGO_URI || '';

export const mailOptions = (email, resetToken) => {
  return {
    from: 'your-email',
    to: email,
    subject: 'Password Reset',
    text: `Use the following token to reset your password: ${resetToken}`,
  };
};
