module.exports = app => {
    const users = require("../controllers/users.controller.js");
    let router= require('express').Router();

    /// create new pin ///
    router.post("/", users.create);

    /// retrieve a single pins with id ///
    router.get("/:id", users.findOne);

    /// delete user with id ///
    router.delete("/:id", users.delete);

    app.use("/api/users", router);

}