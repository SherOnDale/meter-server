const { Pool } = require('pg');

const pg = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
});

pgClient.on('error', () => console.log('Lost PG connection'));
pgClient
  .query('CREATE TABLE IF NOT EXISTS users (number INT)')
  .catch(error => console.log(error));

module.exports = pg;
