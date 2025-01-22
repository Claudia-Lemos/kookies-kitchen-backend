const jwt = require('jsonwebtoken');

// Middleware to protect routes for authenticated users
const protectUser = async (req, res, next) => {
  // Extract token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];  // Assuming format: "Bearer <token>"
  console.log('Received token:', token);  // Debug log for the received token

  // If no token is provided, respond with an unauthorized error
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('Decoded user from token:', decoded);  // Log the decoded token for debugging

    // Attach the decoded user data to the request object
    req.user = decoded;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);  // Log error if token verification fails
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

module.exports = { protectUser };
