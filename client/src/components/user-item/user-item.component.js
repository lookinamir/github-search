import React from 'react';
import { Link } from 'react-router-dom';

import './user-item.styles.scss';

const UserItem = ({ rowNumber, avatarUrl, username }) => (
  <div className="user-item-container">
    <div className="row-number">{rowNumber}.</div>
    <Link to={`/user/${username}/repositories`}>
      <img className="avatar" src={avatarUrl} alt="" />
    </Link>
    <Link to={`/user/${username}/repositories`} className="username">
      {username}
    </Link>
  </div>
);

export default UserItem;
