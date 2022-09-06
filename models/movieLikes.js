const db = require("./db.js");
const _ = require("lodash");

class MovieLikes {
  constructor(liked, disliked, movie_id) {
    this.liked = liked;
    this.disliked = disliked;
    this.movie_id = movie_id;
  }

  updateLikesById = async (id, type, result) => {};
}
