const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {

    const jwtToken = req.header('token');

    if (!jwtToken) {
      return res.status(403).json('Not authorized');
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = payload.user;

  } catch (error) {
    console.error(error.message);
    return res.status(403).json('Not authorized');
  }

  next();
}