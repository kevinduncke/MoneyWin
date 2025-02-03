const DatabaseModule = (function () {
  let db;

  // INIT THE DATABASE
  function init() {
    return new Promise((resolve, reject) => {
      document.addEventListener(
        "deviceready",
        () => {
          db = window.sqlitePlugin.openDatabase({
            name: "moneywin.db",
            location: "default",
          });

          // CREATE TABLES
          db.transaction(
            (tx) => {
              // CREATE USERS TABLE
              tx.executeSql(
                `CREATE TABLE IF NOT EXISTS users (
                  id INTEGER PRIMARY KEY AUTOINCREMENT, 
                  fullname TEXT, 
                  username TEXT, 
                  password TEXT, 
                  salary REAL, 
                  registration_date TEXT
                )`,
                [],
                (tx, res) => {
                  console.log("Users table created successfully");
                  resolve();
                },
                (tx, err) => {
                  console.log("CREATE TABLE ERROR: " + err.message);
                  alert("CREATE TABLE ERROR: " + err.message);
                  reject();
                }
              );
            },
            (error) => {
              console.log("Transaction error: " + error.message);
              reject(error);
            },
            () => {
              console.log("Transaction success");
            }
          );
        },
        false
      );
    });
  }

  function executeQuery(sql, params = []) {
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
    executeQuery,
  };
})();

// EXPOSE THE MODULE GLOBALLY
window.DatabaseModule = DatabaseModule;
