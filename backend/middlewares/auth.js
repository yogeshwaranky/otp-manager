// middlewares/auth.js

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
  
console.log('Token:', token);

    if (!token) {
      throw new Error("Authorization header not provided");
    }
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.SECRET_KEY);

    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

    if (!user) {
      throw new Error("User not found");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = auth;
