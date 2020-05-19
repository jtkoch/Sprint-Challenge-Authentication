const jwt = require('jsonwebtoken');
const secrets = require('../config/secret.js');

module.exports = (req, res, next) => {
  const secret = secrets.jwtSecret;

  try {
    const token = req.headers.authorization
  

  if (token) {
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: 'Invalid token' })
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
      throw new Error("invalid auth data")
  }
} catch (error) {
    res.status(400).json({ errorMessage: 'Please provide credentials.' });
  }
}