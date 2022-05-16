const User = require("../models/user.model.js");


const bcrypt = require('bcrypt');
const uid2 = require('uid2');

const date = new Date();
let d = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate()

exports.create = (req, res) => {
    let hash = bcrypt.hashSync(req.body.password, 10);
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a User
    const pin = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      registeredAt: d,
      password: hash
    });
    // Save Pin in the database
    User.create(pin, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the user."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving user with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  exports.delete = (req, res) => {
    User.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete user with id " + req.params.id
          });
        }
      } else res.send({ message: `user was deleted successfully!` });
    });
  };