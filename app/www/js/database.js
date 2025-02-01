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
                  reject();
                }
              );

              // CREATE BILLS TABLE
              tx.executeSql(
                `CREATE TABLE IF NOT EXISTS bills (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  description TEXT NOT NULL,
                  value REAL NOT NULL,
                  payment TEXT NOT NULL,
                  type TEXT NOT NULL,
                  date TEXT NOT NULL,
                  quantity INTEGER DEFAULT 1,
                  total REAL NOT NULL,
                  currency TEXT NOT NULL,
                  user_id INTEGER NOT NULL,
                  FOREIGN KEY (user_id) REFERENCES users(id)
                )`,
                [],
                (tx, res) => {
                  console.log("Bills table created successfully");
                  resolve();
                },
                (tx, err) => {
                  console.log("CREATE TABLE ERROR: " + err.message);
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
