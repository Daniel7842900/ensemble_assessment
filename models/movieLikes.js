const db = require("./db.js");
const _ = require("lodash");

class MovieLikes {
  constructor(liked, disliked, movie_id) {
    this.liked = liked;
    this.disliked = disliked;
    this.movie_id = movie_id;
  }

  updateLikesById = async (id, type, result) => {
    const findMovieLikesQuery = "SELECT * FROM movie_likes WHERE movie_id = ?";
    const dbType = type + "d";
    const updateMovieLikesQuery =
      "UPDATE movie_likes SET " + dbType + " = ? WHERE movie_id = ?";

    try {
      let rows = await db.query(findMovieLikesQuery, id);
      let row = rows[0][0];
      if (type === "like") {
        if (row.liked != row.disliked && !row.liked) {
          // Case: liked = 0 disliked = 1
          return result({ equal: true }, null);
        } else if (row.liked) {
          // Case: liked = 1 disliked = 0
          let updatedRows = await db.query(updateMovieLikesQuery, [0, id]);
          return result(null, updatedRows);
        } else {
          // Case: liked = 0 disliked = 0
          let updatedRows = await db.query(updateMovieLikesQuery, [1, id]);
          return result(null, updatedRows);
        }
      } else if (type === "dislike") {
        if (row.liked != row.disliked && !row.disliked) {
          // Case: liked = 1 disliked = 0
          return result({ equal: true }, null);
        } else if (row.disliked) {
          // Case: liked = 0 disliked = 1
          let updatedRows = await db.query(updateMovieLikesQuery, [0, id]);
          return result(null, updatedRows);
        } else {
          // Case: liked = 0 disliked = 0
          let updatedRows = await db.query(updateMovieLikesQuery, [1, id]);
          return result(null, updatedRows);
        }
      } else {
        return result({ invalidQueryParam: true }, null);
      }
    } catch (err) {
      console.log("movie_likes updateLikeById err: " + err);
      return result(err, null);
    }
  };
}

module.exports = MovieLikes;
