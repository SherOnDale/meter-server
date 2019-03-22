const { Pool } = require("pg");

const pg = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
});

pg.on("error", () => console.log("Lost PG connection"));
pg.query(
  "CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, email VARCHAR(30) UNIQUE, hash VARCHAR(50), salt VARCHAR(50), fName VARCHAR(20), lName VARCHAR(20), avatarUrl VARCHAR(40) DEFAULT 'not-set', emailHash VARCHAR(50), referrer VARCHAR(30) DEFAULT 'not-set')"
).catch(error => console.log(error));

module.exports = pg;
