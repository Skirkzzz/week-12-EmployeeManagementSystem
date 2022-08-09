const mysql = require(mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database "employees"
});

connection.connect(function (err) {
    if (eff) throw err;
})

module.exports = connection;
