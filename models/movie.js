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
    const query = "SELECT * FROM movies";
    try {
      const rows = await db.query(query);
      return result(null, rows[0]);
    } catch (err) {
      console.log("movie findAll err: " + err);
      return result(err, null);
    }
  };

  findByTitle = async (title, result) => {
    const query = "SELECT * FROM movies m";
    if (title) query += " WHERE UPPER(m.title) LIKE UPPER(?)";
    try {
      const rows = await db.query(query, title);

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
    const createMovieQuery = "INSERT INTO movies SET ?";
    const createMovieLikesQuery =
      "INSERT INTO movie_likes (liked, disliked, movie_id) VALUES (?, ?, ?)";
    try {
      const createdMovie = await db.query(createMovieQuery, movie);
      const movieId = createdMovie[0].insertId;
      console.log("Created a movie: ", {
        id: movieId,
        ...movie,
      });
      const createdMovieLikes = await db.query(createMovieLikesQuery, [
        0,
        0,
        movieId,
      ]);
      return result(null, { id: movieId, ...movie });
    } catch (err) {
      console.log("movie create err: " + err);
      return result(err, null);
    }
  };

  updateById = async (id, movie, result) => {
    const query =
      "UPDATE movies SET title = ?, description = ?, released = ?, duration = ?, rating = ? WHERE id = ?";
    try {
      const rows = await db.query(query, [
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

  deleteById = async (id, result) => {
    const query = "DELETE FROM movies WHERE id = ?";
    try {
      const rows = await db.query(query, id);

      if (rows[0].affectedRows == 0) {
        return result({ isFound: false }, null);
      }

      return result(null, rows);
    } catch (err) {
      console.log("movie deleteById err: " + err);
      return result(err, null);
    }
  };
}

module.exports = Movie;
