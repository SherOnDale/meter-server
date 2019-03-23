const { Pool } = require('pg');

const pg = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
});

pg.on('error', () => console.log('Lost PG connection'));
pg.query(
  "CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, email VARCHAR(30) UNIQUE, hash VARCHAR(50) DEFAULT 'not-set', email_salt VARCHAR(50), hash_salt VARCHAR(50) DEFAULT 'not-set', first_name VARCHAR(20) DEFAULT 'not-set', last_name VARCHAR(20) DEFAULT 'not-set', avatar_url VARCHAR(40) DEFAULT 'not-set', email_hash VARCHAR(50), referrer VARCHAR(30) DEFAULT 'not-set', verified BOOLEAN DEFAULT FALSE, profile BOOLEAN DEFAULT FALSE)"
).catch(error => console.log(error));

module.exports = pg;
