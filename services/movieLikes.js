const MovieLikes = require("../models/movieLikes.js");
const _ = require("lodash");
const Joi = require("joi");
const movieLikes = new MovieLikes();

exports.updateLikesById = (req, res) => {
  let type = req.query.type;
  // Check if 'type' query parameter
  if (type === undefined) {
    res.status(404).send({
      message: `Wrong query parameter!`,
    });
  }

  // Check query parameter
  if (type.length === 0) {
    res.status(404).send({
      message: `Query parameter needs to be provided!`,
    });
  }

  movieLikes.updateLikesById(req.params.id, type, async (err, data) => {
    if (err) {
      if (err.equal) {
        res.status(404).send({
          message: `You can't like and dislike at the same time!`,
        });
      } else if (err.invalidQueryParam) {
        res.status(404).send({
          message: `Invalid query parameter`,
        });
      } else {
        res.status(500).send({
          message: err.message,
        });
      }
    } else {
      //   res.send(data);
    }
  });
};
