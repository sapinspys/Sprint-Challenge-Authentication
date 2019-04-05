const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .first();
}

function add(user) {
  // const [id] =
  return db("users").insert(user);

  // return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
