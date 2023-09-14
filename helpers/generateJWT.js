import jwt from 'jsonwebtoken';
import { jwtExpiryTime, jwtSecretKey } from '../config/constants.js';

const generateJWT = (user, expiresIn = jwtExpiryTime) => {
  const userBase64 = btoa(user.username.concat(user.email));
  const token = jwt.sign({ id: userBase64 }, jwtSecretKey, {
    expiresIn: expiresIn,
  });
  return token;
};
export default generateJWT;
