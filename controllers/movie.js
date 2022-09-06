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

exports.findById = (req, res) => {
  // Validate the request
  if (_.isEmpty(req.params)) {
    res.status(400).send({
      message: "Parameter needs to be provided!",
    });
  }

  movie.findById(req.params.id, async (err, data) => {
    if (err) {
      if (!err.isFound) {
        res.status(404).send({
          message: `Movie ${req.params.id} is not found!`,
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

exports.findByTitle = (req, res) => {};

exports.create = (req, res) => {};

exports.updateById = (req, res) => {};

exports.deleteById = (req, res) => {};
