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
      console.log(data);
      res.send(data);
    }
  });
};

exports.findById = (req, res) => {};

exports.findByTitle = (req, res) => {};

exports.create = (req, res) => {};

exports.updateById = (req, res) => {};

exports.deleteById = (req, res) => {};
