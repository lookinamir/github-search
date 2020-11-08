import React from 'react';

const UserListing = ({ users }) => (
  <div className="user-listing-container">
    <h3>User Listing {users.length}</h3>
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.login}</li>
      ))}
    </ul>
  </div>
);

export default UserListing;
