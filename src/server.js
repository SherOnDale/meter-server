const express = require('express');
const pg = require('./db/pg');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(5000, () => {
  console.log('Listening on port 5000');
});
