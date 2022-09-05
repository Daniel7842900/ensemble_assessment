const db = require("./db.js");

class Movie {
  constructor(title, description, released, duration, rating) {
    this.title = title;
    this.description = description;
    this.released = released;
    this.duration = duration;
    this.rating = rating;
  }

  findAll = async (result) => {};

  findById = async (id, result) => {};

  findByTitle = async (title, result) => {};

  create = async (movie, result) => {};

  updateById = async (id, movie, result) => {};

  deleteById = async (id, result) => {};
}

module.exports = Movie;
