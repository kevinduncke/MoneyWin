"use strict";

import { newRoute } from "../js/routing.js";

document.addEventListener("deviceReady", function () {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      db.transaction(function (tx) {
        tx.executeSql(
          "UPDATE users SET logged_user = 0 WHERE logged_user = 1",
          [],
          function (tx, res) {
            console.log("User logged out successfully");
          },
          function (error) {
            console.log("UPDATE ERROR: " + error.message);
          }
        );
      });

      newRoute("../index.html");
    });
  }
});
