// Admin.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import UserList from './UserList';

const Admin = ({ isAuthenticated, role }) => {
  // Check if the user is authenticated and has the 'admin' role
  if (!isAuthenticated || role !== 'admin') {
    // Redirect the user to the homepage if not authenticated or authorized
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Welcome to the Admin Panel</h1>
      <UserList />
      {/* Add other CRUD operations UI here */}
    </div>
  );
};

export default Admin;
