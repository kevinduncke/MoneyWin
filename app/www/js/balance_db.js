"use strict";

const DatabaseBalances = (function () {
  let db;

  // INIT THE DATABASE
  function init(){
    return new Promise((resolve, reject) => {
      document.addEventListener(
        "deviceready",
        () => {
          db = window.sqlitePlugin.openDatabase({
            name: "balance.db",
            location: "default",
          });

          // CREATE TABLES
          db.transaction(
            (tx) => {
              // CREATE USERS TABLE
              tx.executeSql(
                `CREATE TABLE IF NOT EXISTS balances (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  salaryBalance REAL NOT NULL,
                  billsBalance REAL NOT NULL
                )`,
                [],
                (tx, res) => {
                  console.log("BALANCES TABLE CREATED SUCCESSFULLY");
                  resolve();
                },
                (tx, err) => {
                  console.log("CREATE TABLE ERROR: " + err.message);
                  reject();
                }
              );
            },
            (error) => {
              console.log("TRANSACTION ERROR: " + error.message);
              reject(error);
            },
            () => {
              console.log("TRANSACTION SUCCESS");
            }
          );
        },
        false
      );
    });
  }

  function executeQuery(sql, params = []){
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          sql,
          params,
          (tx, resultSet) => resolve(resultSet),
          (error) => reject(error)
        );
      });
    });
  }

  // PUBLIC API
  return {
    init,
    executeQuery
  };
})();

// EXPOSE THE MODULE GLOBALLY
window.DatabaseBalances = DatabaseBalances;