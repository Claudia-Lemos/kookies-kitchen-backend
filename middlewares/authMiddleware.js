const jwt = require('jsonwebtoken');

// Middleware to protect routes for authenticated users
const protectUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token after 'Bearer'
  console.log('Token:', token);  // This will print the token to the server console

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // Attach user data to the request object
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protectUser };
