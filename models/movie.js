const db = require("./db.js");

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

  findById = async (id, result) => {
    let query = "SELECT * FROM movies m WHERE m.id = ?";
    try {
      let rows = await db.query(query, id);

      if (_.isEmpty(rows[0])) {
        return result({ isFound: false }, null);
      }

      return result(null, rows[0]);
    } catch (err) {
      console.log("movie findById err: " + err);
      return result(err, null);
    }
  };

  findByTitle = async (title, result) => {};

  create = async (movie, result) => {};

  updateById = async (id, movie, result) => {};

  deleteById = async (id, result) => {};
}

module.exports = Movie;
