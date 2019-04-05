const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { authenticate } = require("../auth/authenticate");
const Users = require("../users/users-model.js");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

const URL = "https://localhost:3300";

function register(req, res) {
  const [username, password] = req.body;

  if (username && password) {
    axios
      .post(URL)
      .then(response => {
        res.status(201).json(response);
      })
      .catch(err => {
        res.status(500).json({ message: "Error Fetching Jokes", error: err });
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
