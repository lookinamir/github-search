import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
import axios from 'axios';

import RepositoryItem from '../../components/repository-item/repository-item.component';

import './repository-listing.styles.scss';

const RECORDS_PER_PAGE = 10;
const api = axios.create({
  baseURL: 'http://localhost:5000',
});

const RepositoryListing = () => {
  const { username } = useParams();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRepositories = async () => {
      setIsLoading(true);
      const response = await api.get(
        `/user/${username}/repositories?page=${page}&perPage=${RECORDS_PER_PAGE}`
      );

      setData(response.data.items);
      setIsLoading(false);
    };

    fetchRepositories();
  }, [username, page]);

  return (
    <div className="repository-container">
      <Link to="/">
        <FaAngleLeft /> Lookup another user
      </Link>
      <h3>Top Repositories for {username}</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data.map((repo, row) => (
            <RepositoryItem
              key={repo.id}
              rowNumber={row + 1 + (page - 1) * RECORDS_PER_PAGE}
              name={repo.name}
              description={repo.description}
              stars={repo.stargazers_count}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RepositoryListing;
