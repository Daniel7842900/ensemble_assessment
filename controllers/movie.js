const Movie = require("../models/movie.js");
const _ = require("lodash");
const Joi = require("joi");
const movie = new Movie();

exports.findAll = (req, res) => {
  movie.findAll(async (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.send(data);
    }
  });
};

exports.findByTitle = (req, res) => {
  // Validate the request
  if (_.isEmpty(req.params)) {
    res.status(404).send({
      message: `Parameter needs to be provided!`,
    });
  }

  movie.findByTitle(req.params.title, async (err, data) => {
    if (err) {
      if (err.isFound === false) {
        res.status(404).send({
          message: `Movie ${req.params.title} is not found!`,
        });
      } else {
        res.status(500).send({
          message: err.message,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.create = (req, res) => {
  // Validate the request
  if (_.isEmpty(req.body)) {
    res.status(400).send({
      message: "Content can't be empty!",
    });
  }

  // Validate the object with restriction
  const movieSchema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(1).max(500).required(),
    released: Joi.date().required(),
    duration: Joi.number().min(0).max(300).required(),
    rating: Joi.string().min(1).max(20).required(),
  });

  const validationResult = movieSchema.validate(req.body);
  const { value, error } = validationResult;

  // Output validation error
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Create a new movie object with given input
  const newMovie = _.pick(req.body, [
    "title",
    "description",
    "released",
    "duration",
    "rating",
  ]);

  movie.create(newMovie, async (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.send(data);
    }
  });
};

exports.updateById = (req, res) => {
  // Validate the request
  if (_.isEmpty(req.body)) {
    res.status(400).send({
      message: "Content can't be empty!",
    });
  }

  // Validate the object with restriction
  const movieSchema = Joi.object({
    title: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(1).max(500).required(),
    released: Joi.date().required(),
    duration: Joi.number().min(0).max(300).required(),
    rating: Joi.string().min(1).max(20).required(),
  });

  const validationResult = movieSchema.validate(req.body);
  const { value, error } = validationResult;

  // Output validation error
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Create a new movie object with given input
  const updatedMovie = _.pick(req.body, [
    "title",
    "description",
    "released",
    "duration",
    "rating",
  ]);

  movie.updateById(req.params.id, updatedMovie, (err, data) => {
    if (err) {
      if (err.isFound === false) {
        res.status(404).send({
          message: `Movie ${req.params.id} is not found!`,
        });
      } else {
        res.status(500).send({
          message: `An error updating movie ${req.params.id}`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.deleteById = (req, res) => {
  if (_.isEmpty(req.params)) {
    res.status(400).send({
      message: `Parameter needs to be provided!`,
    });
  }

  movie.deleteById(req.params.id, (err, data) => {
    if (err) {
      if (err.isFound === false) {
        res.status(404).send({
          message: `Movie ${req.params.id} is not found!`,
        });
      }
      res.status(500).send({
        message: `An error deleting movie ${req.params.id}`,
      });
    } else {
      res.send(data);
    }
  });
};
