const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureRoutes = require('../config/routes.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(function(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);

  next();
});

server.get("/", (req, res) => {
  res.send("Thanks for visiting!");
});

configureRoutes(server);

server.use(function(req, res) {
  res.status(404).send("Turn back, route not found.");
});


module.exports = server;
