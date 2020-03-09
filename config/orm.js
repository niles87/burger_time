var connection = require("../config/connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    var value = ob[key];

    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }

      arr.push(key + "=" + value);
    }
  }

  return arr.toString();
}

var orm = {
  all: function(tableInput, callback) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  },
  create: function(table, cols, vals, callback) {
    var queryString =
      "INSERT INTO " +
      table +
      " (" +
      cols.toString() +
      ") VALUES (" +
      printQuestionMarks(vals.length) +
      ");";
    console.log(queryString);
    connection.query(queryString, vals, (err, result) => {
      if (err) throw err;
      callback(result);
    });
  },
  update: function(table, objColVals, condition, callback) {
    var queryString = "UPDATE " + table + " SET " + objToSql(objColVals) + " WHERE " + condition;

    console.log(queryString);

    connection.query(queryString, (err, result) => {
      if (err) throw err;
      callback(result);
    });
  },
};

module.exports = orm;
