const Pin = require("../models/pin.model.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a Pins
    const pin = new Pin({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published || false
    });
    // Save Pin in the database
    Pin.create(pin, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Pin."
        });
      else res.send(data);
    });
  };

  // Retrieve all Pin from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;
    Pin.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving pins."
        });
      else res.send(data);
    });
  };
  exports.findAllPublished = (req, res) => {
    Pin.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving pins."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Pin.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Pin with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Pin with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log(req.body);
    Pin.updateById(
      req.params.id,
      new Pin(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Pin with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Pin with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  }; 

  exports.delete = (req, res) => {
    Pin.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Pin with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Pin with id " + req.params.id
          });
        }
      } else res.send({ message: `Pin was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Pin.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Pins."
        });
      else res.send({ message: `All Pins were deleted successfully!` });
    });
  };
