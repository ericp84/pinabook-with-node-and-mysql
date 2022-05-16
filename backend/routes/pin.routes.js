module.exports = app => {
    const pins = require("../controllers/pins.controller.js");
    let router= require('express').Router();

    /// create new tuto ///
    router.post("/", pins.create);

    /// retrieve all tutos ///
    router.get("/", pins.findAll);

    /// retrieve all published pins ///
    router.get("/published", pins.findAllPublished);

    /// retrieve a single tuto with id ///
    router.get("/:id", pins.findOne);

    /// update a pin with id ///
    router.put("/:id", pins.update);

    /// delete tuto with id ///
    router.delete("/:id", pins.delete);

    /// delete all tutos ///*
    router.delete("/", pins.deleteAll);

    app.use("/api/pins", router);
}