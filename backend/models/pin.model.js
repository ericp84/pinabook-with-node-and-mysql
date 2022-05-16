const req = require('express/lib/request');
const sql = require ('./db');

const Pin = function (pin) {
    this.title = pin.title;
    this.description = pin.description;
    this.published = pin.published;
};

Pin.create = (newPin, result) => {
    sql.query("INSERT INTO pins SET ?", newPin, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        console.log("id poacket", res.insertId)
        console.log("created pin: ", {id: res.insertId, ...newPin});
        result(null, {id: res.insertId, ...newPin});
    });
};

Pin.findById = (id, result) => {
    sql.query(`SELECT * FROM pins WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found pin: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "not_found"}, null);
    });
};

Pin.getAll = (title, result) => {
    let query = "SELECT * FROM pins";
    if (title) {
      query += ` WHERE title LIKE '%${title}%'`;
    }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("pins: ", res);
      result(null, res);
    });
};

Pin.getAllPublished = result => {
    sql.query("SELECT * FROM pins WHERE published=true", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("pins: ", res);
      result(null, res);
    });
};

Pin.updateById = (id, pin, result) => {
    sql.query(
      "UPDATE pins SET title = ?, description = ?, published = ? WHERE id = ?",
      [pin.title, pin.description, pin.published, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found Pin with the id
          result({ kind: "not_found" }, null);
          return;
        }
        console.log("updated pin: ", { id: id, ...pin });
        result(null, { id: id, ...pin });
      }
    );
};

Pin.remove = (id, result) => {
    sql.query("DELETE FROM pins WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows === 0) {
        // not found Pins with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("deleted pin with id: ", id);
      result(null, res);
    });
};

Pin.removeAll = result => {
    sql.query("DELETE FROM pins", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log(`deleted ${res.affectedRows} pins`);
      result(null, res);
    });
};

module.exports = Pin;
