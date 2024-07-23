// config/db.config.js
const { Pool } = require("pg");
const { getSecret } = require("../secretManager");

let pool;

async function initializePool() {
  const dbPassword = await getSecret("mysecret");
  const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: dbPassword,
    port: 5432,
  };

  pool = new Pool(dbConfig);

  pool.on("connect", () => {
    console.log("Connected to the database");
  });

  pool.on("error", (err) => {
    console.error("Error connecting to the database:", err);
  });
}

const query = async (text, params) => {
  if (!pool) {
    await initializePool();
  }

  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
};

module.exports = {
  query,
  initializePool,
};
