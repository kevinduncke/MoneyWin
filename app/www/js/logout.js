"use strict";

import { newRoute } from "../js/routing.js";

document.addEventListener(
  "deviceReady",
  function () {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        closeSession();
      });
    }
  },
  false
);

async function closeSession() {
  const sql = "UPDATE users SET logged_user = 0 WHERE logged_user = 1";
  const params = [];

  try {
    // Ensure DatabaseModule is initialized
    if (!DatabaseModule) {
      throw new Error("Database module is not initialized.");
    }

    const resultSet = await DatabaseModule.executeQuery(sql, params);

    if (resultSet.rowsAffected > 0) {
      console.log("User logged out successfully");
      alert("You have been logged out successfully.");
      newRoute("../index.html");
    } else {
      console.error("UPDATE ERROR: " + error.message);
      alert("No user was logged in.");
    }
  } catch (error) {
    console.error("Cannot close the session. Try Again.", error);
    alert("Failed to log out. Please try again.");
  }
}
