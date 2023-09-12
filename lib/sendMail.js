import nodemailer from 'nodemailer';

export function sendMail(email, resetToken) {
  // Configure nodemailer transporter (replace with your email service details)
  const transporter = nodemailer.createTransport({
    service: 'your-email-service',
    auth: {
      user: 'your-email',
      pass: 'your-email-password',
    },
  });
  const mailOptions = {
    from: 'your-email',
    to: email,
    subject: 'Password Reset',
    text: `Use the following token to reset your password: ${resetToken}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
