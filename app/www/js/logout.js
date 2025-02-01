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

function closeSession() {
  try {
    localStorage.removeItem("rememberUserId");
    sessionStorage.removeItem("actualSession");
    console.log("User logged out successfully");
    alert("You have been logged out successfully.");
    newRoute("../index.html");
  } catch (error) {
    console.error("Cannot close the session. Try Again.", error);
    alert("Failed to log out. Please try again.");
  }
}
