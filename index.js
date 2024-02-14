// loads .env file content into process.env by default
require("dotenv").config();

//import express
const express = require("express");

//import cors
const cors = require("cors");

//import user  router
const router = require("./Routes/router");

const appMiddleware = require("./Middlewares/appMiddleware");

const db = require("./DB/connection");

//create a backend application using express
const pfServer = express();

//use cors
pfServer.use(cors());
pfServer.use(express.json());
pfServer.use(appMiddleware);
pfServer.use(router);
pfServer.use("/uploads", express.static('./uploads'));

//port creation
const PORT = 4000 || process.env.PORT;

// server litsten
pfServer.listen(PORT, () => {
  console.log("pf server listening on port  " + PORT);
});

//
pfServer.get("/", (req, res) => {
  res.send(`<h1>PROJECT FAIR SERVER STARTED</h1>`);
});
