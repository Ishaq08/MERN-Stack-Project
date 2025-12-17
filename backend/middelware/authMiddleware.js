const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path as necessary

// Middleware function to protect routes
const protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in headers
  // The token is expected in the format: "Bearer <TOKEN>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // 2. Extract the token from the "Bearer <TOKEN>" string
      // Split by space and get the second element (index 1)
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token (using the logic from Screenshot 302/303)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user by ID from the decoded payload
      // decoded.user.id is the ID we embedded in the JWT payload during login/register
      // .select("-password") excludes the hashed password from the result
      req.user = await User.findById(decoded.user.id).select('-password');

      // 5. If successful, move to the next middleware or route handler
      next();
    } catch (error) {
      // Handle token verification failure
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // 6. Handle case where no token is provided in the headers
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};


//middleware to check if the user is admin
const admin = (req,res,next ) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({message: "Not authorized as an user"})
    }
}
module.exports = { protect, admin };
