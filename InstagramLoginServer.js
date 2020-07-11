const express = require('express');
const axios = require('axios');

const app = express();
const port = 3001;

const redirectUrl = 'https://localhost:3000/instagramauth';
const responseType = 'code';
const clientSecret = '9e3ad75ebe40b896668f78d35b153c75';
const clientId = '2700206580260144';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Token, Content-Type, Accept',
  );
  next();
});

app.post('/instagramauth', (req, res, next) => {
  console.log(req.headers.authCode);
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const form = new FormData();

  form.append('client_id', clientId);
  form.append('client_secret', clientSecret);
  form.append('grant_type', 'authorization_code');
  form.append('redirect_uri', 'https://localhost:3000/instagramauth');
  form.append('code', req.headers.authCode);

  const requestAuthCode = axios.create({
    baseURL: 'https://api.instagram.com/oauth/access_token',
    headers,
  });

  requestAuthCode
    .post('/', form)
    .then((response) => console.log(response))
    .catch((error) => {
      console.log(error.response);
    });
  next();
});

app.post('/instagramauth', (req, res) => {});

app.listen(port, () => console.log());
