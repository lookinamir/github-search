import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FormInput from '../../components/form-input/form-input.component';
import UserListing from '../../components/user-listing/user-listing.component';

import './user-search.styles.scss';

const RECORDS_PER_PAGE = 10;
const api = axios.create({
  baseURL: 'http://localhost:5000/users',
});

const UserSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [urlParams, setUrlParams] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!searchValue.length) return;
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await api.get(`/?${urlParams}`);
        setData(results.data.items);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchUsers();
  }, [urlParams]);

  const handleChange = (event) => {
    const { value } = event.target;

    setSearchValue(value);
    if (data.length) {
      setData([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setUrlParams(
      `userSearch=${searchValue}&page=${page}&perPage=${RECORDS_PER_PAGE}`
    );
  };

  return (
    <div className="user-search-container">
      <p>Search GitHub users to view their top repositories.</p>
      <form className="search-form" onSubmit={handleSubmit}>
        <FormInput type="search" label="User" handleChange={handleChange} />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Unable to retrieve users</div>}

      {isLoading && <div>Loading...</div>}

      {data.length ? (
        <div>
          <h3>Users matching "{searchValue}"</h3>
          <UserListing
            users={data}
            rowStart={(page - 1) * RECORDS_PER_PAGE + 1}
          />
        </div>
      ) : null}
    </div>
  );
};

export default UserSearch;
