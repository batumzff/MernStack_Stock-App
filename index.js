"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const express = require("express");
const path = require("node:path");
const app = express();

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config({ path: __dirname + "/.env" });
const HOST = process.env?.HOST || "0.0.0.0";
const PORT = process.env?.PORT || 10000;

// asyncErrors to errorHandler:
require("express-async-errors");

app.use(express.static(path.join(__dirname, "public")));

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());
app.use(require("cors")());
app.use(express.urlencoded({ extended: true }));

// Call static uploadFile:
app.use("/uploads", express.static("./uploads"));

// Check Authentication:
app.use(require("./src/middlewares/authentication"));

// Run Logger:
// app.use(require("./src/middlewares/logger"));

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

/* ------------------------------------------------------- */
// Routes:

// HomePath:
app.all("/api/v2/documents", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Stock Management API",
    documents: {
      swagger: "api/v2/documents/swagger",
      redoc: "api/v2/documents/redoc",
      json: "api/v2/documents/json",
    },
    user: req.user,
  });
});

// Routes:
app.use("/api/v2", require("./src/routes"));

/* ------------------------------------------------------- */
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});
app.get("*", (req, res) => {
  res.status(404), express.json({ msg: "not found" });
});

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.
