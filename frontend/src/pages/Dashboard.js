// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { getDashboardData, getUserData } from '../services/Api';  // Make sure getDashboardData is imported

import './dashboard.css'; 

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showOtpManager, setShowOtpManager] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardResponse = await getDashboardData();
        console.log('Dashboard Data:', dashboardResponse.data);

        // Additional logic for fetching other data if needed
        const userResponse = await getUserData();
       console.log('User Data:', userResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOtpManagerClick = async () => {
    try {
      const response = await getUserData();
      setUserData(response.data);
      setShowWelcome(false);
      setShowOtpManager(true); // Show OTP Manager table
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    // Implement logic to delete user with userId
    console.log(`Deleting user with ID: ${userId}`);
  };
  

  return (
    <div id="main-content">
      {showWelcome && (
        <div className="welcome-message">
          Welcome to OTP Manager!
        </div>
      )}

      {!showOtpManager && (
        <button id="otp-manager-button" onClick={handleOtpManagerClick}>
          OTP MANAGER
        </button>
      )}

      {showOtpManager && (
        <div className="table-container mt-4">
          <h2 className="table-header">User Data</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>OTP</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData?.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.fname}</td>
                  <td>{user.email}</td>
                  <td>{user.otp}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                    {/* Add update/edit button and functionality as needed */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;