const db = require("./db.js");
const _ = require("lodash");

class Movie {
  constructor(title, description, released, duration, rating) {
    this.title = title;
    this.description = description;
    this.released = released;
    this.duration = duration;
    this.rating = rating;
  }

  findAll = async (result) => {
    let query = "SELECT * FROM movies";
    try {
      let rows = await db.query(query);
      return result(null, rows[0]);
    } catch (err) {
      console.log("movie findAll err: " + err);
      return result(err, null);
    }
  };

  findByTitle = async (title, result) => {
    let query = "SELECT * FROM movies m";
    if (title) query += " WHERE UPPER(m.title) LIKE UPPER(?)";
    try {
      let rows = await db.query(query, title);

      if (_.isEmpty(rows[0])) {
        return result({ isFound: false }, null);
      }

      return result(null, rows[0]);
    } catch (err) {
      console.log("movie findByTitle err: " + err);
      return result(err, null);
    }
  };

  create = async (movie, result) => {};

  updateById = async (id, movie, result) => {};

  deleteById = async (id, result) => {};
}

module.exports = Movie;
