let db;

document.addEventListener("deviceready", function () {
  db = window.sqlitePlugin.openDatabase({
    name: "moneywin.db",
    location: "default",
  });

  db.transaction(
    function (tx) {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, fullname TEXT, username TEXT, password TEXT, salary REAL, registration_date TEXT, logged_user INTEGER DEFAULT 0)",
        [],
        function (tx, res) {
          console.log("Table created successfully");
          // alert("Table created successfully");
        },
        function (tx, err) {
          console.log("CREATE TABLE ERROR: " + err.message);
          // alert("CREATE TABLE ERROR: " + err.message);
        }
      );
    },
    function (error) {
      console.log("Transaction error: " + error.message);
      // alert("Transaction error: " + error.message);
    },
    function () {
      console.log("Transaction success");
      // alert("Transaction success");
    }
  );
});
