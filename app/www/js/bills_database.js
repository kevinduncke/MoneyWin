"use strict";

const DatabaseBills = (function () {
  let bills_db;

  // INIT THE DATABASE
  function init() {
    return new Promise((resolve, reject) => {
      document.addEventListener(
        "deviceready",
        () => {
          bills_db = window.sqlitePlugin.openDatabase({
            name: "bills.db",
            location: "default",
          });

          // CREATE TABLES
          bills_db.transaction(
            (tx) => {
              // CREATE BILLS TABLE
              tx.executeSql(
                `CREATE TABLE IF NOT EXISTS bills (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  description TEXT NOT NULL,
                  userid INTEGER NOT NULL
                )`,
                [],
                (tx, res) => {
                  console.log("BILLS TABLE CREATED SUCCESSFULLY");
                  resolve();
                },
                (tx, err) => {
                  console.log(
                    "ERROR WHILE TRYING TO CREATE TABLE" + err.message
                  );
                  reject("CREATE TABLE ERROR: " + err.message);
                }
              );
            },
            (error) => {
              console.error("TRANSACTION ERROR: " + error.message);
              reject("TRANSACTION ERROR: " + error.message);
            },
            () => {
              console.log("TRANSACTION SUCCESS");
              resolve();
            }
          );
        },
        false
      );
    });
  }

  // FUNCTION TO EXECUTE A REQUESTED SQL QUERY
  function executeQuery(sql, params = []) {
    if (typeof sql !== "string" || !Array.isArray(params)) {
      return Promise.reject(
        "Invalid arguments: sql must be a string and params must be an array."
      );
    }

    return new Promise((resolve, reject) => {
      bills_db.transaction((tx) => {
        tx.executeSql(
          sql,
          params,
          (tx, resultSet) => resolve(resultSet),
          (error) => reject("QUERY ERROR: " + error.message)
        );
      });
    });
  }

  // PUBLIC API
  return {
    init,
    executeQuery,
  };
})();

// EXPOSE THE MODULE GLOBALLY
window.DatabaseBills = DatabaseBills;
