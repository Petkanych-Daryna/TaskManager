import React from 'react';
import UserCard from '../../components/UserCard/UserCard';
import './Users.css';

export const Users = ({ users = [] }) => {
  return (
    <div className="users-container">
      <h2 className="users-title">Users</h2>
      
      {users.length > 0 ? (
        <div className="users-list">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <p className="users-empty">No users found.</p>
      )}
    </div>
  );
};

export default Users;