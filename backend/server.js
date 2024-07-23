// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
const routes = require("./routes/routes");
const { initializePool } = require("./db");

app.use(bodyParser.json());
app.use(cors());
app.use("/api", routes); // Prefix all routes with `/api` for better organization

// Initialize database pool before starting the server
initializePool()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
    process.exit(1);
  });
