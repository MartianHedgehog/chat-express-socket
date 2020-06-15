const express = require('express');

const app = express();
const port = 3001;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001/'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/instagramauth', (req, res, next) => {
  console.log(req, res);
});

app.post('/instagramauth', (req, res) => {});

app.listen(port, () => console.log());
