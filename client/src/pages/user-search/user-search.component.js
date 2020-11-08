import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchInput from '../../components/search-input/search-input.component';
import UserListing from '../../components/user-listing/user-listing.component';

const RECORDS_PER_PAGE = 10;
const api = axios.create({
  baseURL: 'http://localhost:5000/users',
});

const UserSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [urlParams, setUrlParams] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      if (!urlParams.length) return;

      const results = await api.get(`/?${urlParams}`);

      setData(results.data.items);
    };

    fetchUsers();
  }, [urlParams]);

  const handleChange = (event) => {
    const { value } = event.target;

    setSearchValue(value);
  };

  return (
    <div className="user-search-container">
      <SearchInput type="search" label="User" handleChange={handleChange} />
      <button
        type="button"
        onClick={() =>
          setUrlParams(
            `userSearch=${searchValue}&page=${page}&perPage=${RECORDS_PER_PAGE}`
          )
        }
      >
        Search
      </button>
      <UserListing users={data} />
    </div>
  );
};

export default UserSearch;
