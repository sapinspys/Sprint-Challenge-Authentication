const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { authenticate } = require("../auth/authenticate");
const db = require("../database/dbConfig.js");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

const URL = "https://localhost:3300";

function register(req, res) {
  let { username, password } = req.body;

  if (username && password) {
    const hash = bcrypt.hashSync(password, 14);
    password = hash;

    db("users")
      .insert({ username, password })
      .then(id => {
        res.status(201).json({
          message: "Success!"
        });
      })
      .catch(error => {
        if (error.errno === 19) {
          res.status(400).json({
            message: "Username already exists"
          });
        } res.status(500).json(error);
      });
  } else {
    res.status(400).json({
      message: "Please provide username and password"
    });
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
