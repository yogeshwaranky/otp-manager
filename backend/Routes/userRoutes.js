// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userService = require('../services/userService');

// Example route to fetch users based on a query
router.get('/users', auth, async (req, res) => {
  try {
    // Example query, modify based on your needs
    const query = { email: 'yogeshwaranky2103@gmail.com' };

    // Call the service to fetch user data based on the query
    const userData = await userService.getUserDataByQuery(query);

    res.json(userData);
  } catch (error) {
    console.error('Error in user route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
