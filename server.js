const express = require('express');
const axios = require('axios');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const github = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000,
  headers: {
    Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
    'Content-Type': 'application/json;charset=UTF-8',
    accept: 'application/vnd.github.v3+json',
  },
});

app.use(cors());

/* 
	search GitHub users matching user's request, with params:
	q = search criteria
	perPage = number of results per page
	page = current page number
*/
app.get('/users', async (req, res) => {
  let url = '/search/users';
  let per_page = req.query.perPage || 10;
  let page = req.query.page || 1;

  // require user query param, otherwise throw error
  let { userSearch } = req.query;

  try {
    const response = await github.get(url, {
      params: {
        per_page,
        page,
        q: userSearch,
      },
    });

    res.send(response.data);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
});

app.get('/user/:username/repositories', async (req, res) => {
  let url = '/search/repositories';
  let per_page = req.query.perPage || 10;
  let page = req.query.page || 1;

  // require user param, otherwise throw error
  let { username } = req.params;

  try {
    const response = await github.get(url, {
      params: {
        per_page,
        page,
        q: `user:${username}`,
        sort: 'stars',
        order: 'desc',
      },
    });

    res.send(response.data);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
});

app.listen(port, (error) => {
  if (error) throw error;
  console.log('Server running on port ' + port, process.env.GITHUB_API_TOKEN);
});
