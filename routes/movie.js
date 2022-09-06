const router = require("express").Router();
const movies = require("../controllers/movie.js");
const movieLikes = require("../services/movieLikes.js");

const loadRouter = (app) => {
  // Get all movies
  router.get("/", movies.findAll);

  // Get a movie with title
  router.get("/:title", movies.findByTitle);

  // Create a movie
  router.post("/", movies.create);

  // Update a movie
  router.post("/:id", movies.updateById);

  // Delete a movie
  router.delete("/:id", movies.deleteById);

  // Update like/dislike status
  router.post("/:id/toggle-like", movieLikes.updateLikesById);

  app.use("/api/movie", router);
};

module.exports = {
  loadRouter: loadRouter,
};
