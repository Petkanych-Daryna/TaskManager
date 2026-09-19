import React from 'react';
import { Link } from 'react-router-dom';
import './UserCard.css';

export const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <h4>{user?.name || 'User Name'}</h4>
      <p>Email: {user?.email || 'email@example.com'}</p>
      <Link to={`/users/${user?.id || 1}`}>View User Tasks</Link>
    </div>
  );
};

export default UserCard;