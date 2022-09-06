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

  create = async (movie, result) => {
    console.log(movie);
    let query = "INSERT INTO movies SET ?";
    try {
      let rows = await db.query(query, movie);
      console.log("Created a movie: ", { id: rows[0].insertId, ...movie });
      return result(null, { id: rows[0].insertId, ...movie });
    } catch (err) {
      console.log("movie create err: " + err);
      return result(err, null);
    }
  };

  updateById = async (id, movie, result) => {
    let query =
      "UPDATE movies SET title = ?, description = ?, released = ?, duration = ?, rating = ? WHERE id = ?";
    try {
      let rows = await db.query(query, [
        movie.title,
        movie.description,
        movie.released,
        movie.duration,
        movie.rating,
        id,
      ]);

      if (rows[0].affectedRows == 0) {
        return result({ isFound: false }, null);
      }

      return result(null, rows);
    } catch (err) {
      console.log("movie updateById err: " + err);
      return result(err, null);
    }
  };

  deleteById = async (id, result) => {};
}

module.exports = Movie;
