const { Pool } = require("pg");
const { getSecret } = require("../secretManager");

let pool;

async function initializePool() {
  try {
    const dbConfig = await getSecret("DB_CONFIG"); // Fetch DB config from Secret Manager
    pool = new Pool(JSON.parse(dbConfig)); // Parse and use the config

    pool.on("connect", () => {
      console.log("Connected to the database");
    });

    pool.on("error", (err) => {
      console.error("Error connecting to the database:", err.message);
    });
  } catch (error) {
    console.error("Failed to initialize database pool:", error.message);
    process.exit(1); // Exit if unable to initialize the pool
  }
}

const query = async (text, params) => {
  if (!pool) {
    await initializePool();
  }

  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } catch (err) {
    console.error("Error executing query:", err.message);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  query,
  initializePool,
};
