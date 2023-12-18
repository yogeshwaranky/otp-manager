// services/userService.js
const User = require('../models/user');

const getUserDataByQuery = async (query) => {
  try {
    const userData = await User.find(query); // Using the find method with the query
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Rethrow the error for the calling function to handle
  }
};

module.exports = {
  getUserDataByQuery,
};
