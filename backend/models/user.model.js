const sql = require ('./db');

const User = function (user) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.registeredAt = user.registeredAt;
    this.password = user.password;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err, null);
            return;
        }
        console.log("created pin: ", {id: res.insertId, ...newUser});
        result(null, {id: res.insertId, ...newUser});
    });
};

User.findOne = (email, result) => {
    sql.query(`SELECT * FROM users WHERE email = "${email}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "not_found"}, null);
    });
};


User.remove = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
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
      console.log("deleted user with id: ", id);
      result(null, res);
    });
};

module.exports = User;
