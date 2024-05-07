// const { Pool } = require("pg");
import pg from "pg";

const pool = new pg.Pool({
  database: "7learn",
  user: "amir",
  password: "admin",
});

export function query(text, params) {
  pool.query(text, params);
}
