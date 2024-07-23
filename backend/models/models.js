const pool = require("./db");

// Insert a new user into the database
const insertUser = async (
  firstName,
  lastName,
  email,
  password,
  role,
  bu,
  transport
) => {
  const sql =
    "INSERT INTO users (first_name, last_name, email, password, bu, transport, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
  const values = [firstName, lastName, email, password, bu, transport, role];
  try {
    const { rows } = await pool.query(sql, values);
    return rows[0];
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
};

// Find a user by email and password
const findUserByEmailAndPassword = async (email, password) => {
  const sql = "SELECT * FROM users WHERE email = $1 AND password = $2";
  const values = [email, password];
  try {
    const { rows } = await pool.query(sql, values);
    return rows;
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
};

// Get business units
const getBu = async () => {
  const query = "SELECT * FROM business_unit";
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
};

// Get allocated seats for admin
const getAllocatedSetsAdmin = async () => {
  const query = "SELECT * FROM seat_allocation";
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
};

// Get seating capacity for admin
const getSeatingCapacityAdmin = async () => {
  const query = "SELECT * FROM seating_capacity";
  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
};

// Create new seating capacity
const createSeatingCapacityAdmin = async (body) => {
  const { country, state, city, floor, capacity } = body;
  const values = [country, state, city, parseInt(floor), parseInt(capacity)];
  const query =
    "INSERT INTO seating_capacity (country, state, city, floor, capacity) VALUES ($1, $2, $3, $4, $5)";
  try {
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
};

// Update seating capacity
const updateSeatingCapacityAdmin = async (id, capacity) => {
  const query = "UPDATE seating_capacity SET capacity = $1 WHERE id = $2";
  const values = [parseInt(capacity), id];
  try {
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
};

// Delete seating capacity
const deleteSeatingCapacityAdmin = async (id) => {
  const query = "DELETE FROM seating_capacity WHERE id = $1";
  const values = [id];
  try {
    const res = await pool.query(query, values);
    return res;
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
};

// Create new allocated seats
const createAllocatedSetsAdmin = async (body) => {
  const { country, state, city, floor, bu, seats } = body;
  const values = [
    country,
    state,
    city,
    parseInt(floor),
    bu,
    seats,
    seats.length > 0 ? seats.length : 0,
  ];
  const query =
    "INSERT INTO seat_allocation (country, state, city, floor, bu_id, seats, total) VALUES ($1, $2, $3, $4, $5, $6::int[], $7)";
  try {
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
};

// Get seating capacity by filter
const getSeatingCapacityAdminByFilter = async (values) => {
  const query =
    "SELECT SUM(capacity) FROM seating_capacity WHERE country = $1 AND state = $2 AND city = $3 AND floor = $4";
  try {
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
};

// Get HOE from the table
const getHOEFromTable = async (id) => {
  const sql = `SELECT t1.id, t1.name, t1.manager, t1.role, t2.country, t2.state, t2.city, t2.campus, t2.floor, t2.total, t2.seats
               FROM business_unit AS t1
               INNER JOIN seat_allocation AS t2
               ON t1.id = t2.bu_id
               WHERE t1.id = $1`;
  const values = [id];
  try {
    const { rows } = await pool.query(sql, values);
    return rows;
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
};

// Get managers by HOE ID
const getManagersByHOEIdFromTable = async (id, campus, floor) => {
  const sql =
    "SELECT * FROM manager_allocation WHERE hoe_id = $1 AND campus = $2 AND floor = $3 ORDER BY seats_array[1]";
  const values = [id, campus, floor];
  try {
    const { rows } = await pool.query(sql, values);
    return rows;
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
};

// Update manager data
const updateManagerData = async (id, seats) => {
  const sql = "UPDATE manager_allocation SET seats_array = $1 WHERE id = $2";
  const values = [seats, id];
  try {
    const result = await pool.query(sql, values);
    return result;
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  }
};

module.exports = {
  insertUser,
  findUserByEmailAndPassword,
  getBu,
  getAllocatedSetsAdmin,
  getSeatingCapacityAdmin,
  createSeatingCapacityAdmin,
  updateSeatingCapacityAdmin,
  deleteSeatingCapacityAdmin,
  createAllocatedSetsAdmin,
  getSeatingCapacityAdminByFilter,
  getHOEFromTable,
  getManagersByHOEIdFromTable,
  updateManagerData,
};
