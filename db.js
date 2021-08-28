const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 6000,
  database: "kayan"
});

module.exports = pool;