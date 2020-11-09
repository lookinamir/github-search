import React from 'react';
import { FaRegStar } from 'react-icons/fa';

import './repository-item.styles.scss';

const RepositoryItem = ({ rowNumber, name, description, stars }) => (
  <div className="repository-item">
    <div className="repo-heading">
      <h4 className="repo-name">
        {rowNumber}. {name}
      </h4>
      <div className="stars">
        <FaRegStar /> {parseInt(stars).toLocaleString('en')}
      </div>
    </div>
    <p>{description}</p>
  </div>
);

export default RepositoryItem;
