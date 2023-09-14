import jwt from 'jsonwebtoken';
import { jwtSecretKey } from '../config/constants.js';
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = (authHeader && authHeader.split(' ')[1]) || req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    console.log(user);
    req.user = user;
    next();
  });
}
export default authenticateToken;
