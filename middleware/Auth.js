const jwt = require('jsonwebtoken');

// Middleware to ensure a user is authenticated
const ensureAuthenticated = (req, res, next) => {
  // Extract the 'authorization' header from the request
  const authHeader = req.headers['authorization'];

  // Check if the authorization header exists
  if (!authHeader) {
    return res.status(401).json({
      message: 'Unauthorized, JWT token is required', // Changed status to 401 (Unauthorized)
    });
  }

  // Split the Bearer token (if provided in format "Bearer <token>")
  const token = authHeader.split(' ')[1];

  // Check if the token exists
  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized, JWT token is missing',
    });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Attach the decoded payload to the request object for future access
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle invalid or expired token
    return res.status(403).json({
      message: 'Unauthorized, JWT token is invalid or expired',
    });
  }
};

module.exports = ensureAuthenticated;
