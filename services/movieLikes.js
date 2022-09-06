const MovieLikes = require("../models/movieLikes.js");
const _ = require("lodash");
const Joi = require("joi");
const movieLikes = new MovieLikes();

exports.updateLikesById = (req, res) => {
  movieLikes.updateLikesById(req.params.id, type, async (err, data) => {});
};
