module.exports = app => {
    const users = require("../controllers/users.controller.js");
    let router= require('express').Router();

    /// create new user ///
    router.post("/", users.create);

    /// retrieve a single user with email ///
    router.post("/log", users.findOne);

    /// delete user with id ///
    router.delete("/:id", users.delete);

    app.use("/api/users", router);

}