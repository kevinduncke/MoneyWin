"use strict";

import { newRoute } from "./routing.js";

document.addEventListener("deviceReady", function () {
  const signupBtn = document.getElementById("signup-btn");
  signupBtn.addEventListener("click", () => {
    const fullname = document.getElementById("signup-fullname").value.trim();
    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const salary = parseFloat(
      document.getElementById("signup-salary").value.trim()
    );
    const registration_date = new Date().toISOString();

    if (!fullname || !username || !password || isNaN(salary)) {
      alert("Please fill all fields");
      return;
    }

    // ADD CONDITIONAL STATEMENT TO CHECK FOR EXISTING USER
    // ...

    // FN TO ADD NEW USER TO DATABASE
    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO users (fullname, username, password, salary, registration_date) VALUES (?, ?, ?, ?, ?)",
        [fullname, username, password, salary, registration_date],
        function (tx, res) {
          console.log("User signed up successfully with ID: " + res.insertId);
          // alert("User signed up successfully with ID: " + res.insertId);
          accountReload();
        },
        function (error) {
          console.log("INSERT ERROR: " + error.message);
          // alert("INSERT ERROR: " + error.message);
        }
      );
    });
  });
});

function accountReload() {
  document.getElementById("app-signup").style.display = "none";
  document.getElementById("app-signup-status").style.display = "block";

  newRoute("../index.html");
}
