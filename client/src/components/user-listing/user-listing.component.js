import React from 'react';

import UserItem from '../user-item/user-item.component';

const UserListing = ({ users, rowStart }) => (
  <div className="user-listing-container">
    {users.map((user, row) => (
      <UserItem
        key={row}
        rowNumber={row + rowStart}
        username={user.login}
        avatarUrl={user.avatar_url}
      />
    ))}
  </div>
);

export default UserListing;
