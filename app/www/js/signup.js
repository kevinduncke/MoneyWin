"use strict";

import { hashPassword } from "./hashing.js";
import { showNotification } from "./notifications.js";
import { newRoute } from "./routing.js";

document.addEventListener("deviceready", function () {
  const signupBtn = document.getElementById("signup-btn");
  signupBtn.addEventListener("click", () => {
    newUser();
  });
});

function accountReload() {
  document.getElementById("app-signup").style.display = "none";
  document.getElementById("app-signup-status").style.display = "block";

  newRoute("../index.html");
}

// FUNCTION NEW USER AND INSERT TO DATABASE
async function newUser() {
  const fullname = document.getElementById("signup-fullname").value.trim();
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const salary = parseFloat(
    document.getElementById("signup-salary").value.trim()
  );
  const registration_date = new Date().toISOString();

  // INPUT VALIDATION
  if (!fullname || !username || !password || isNaN(salary)) {
    showNotification(
      "Please fill all fields. Salary must be a number.",
      "info"
    );
    return;
  }

  // HASHING PASSWORD
  const hashedPassword = await hashPassword(password);
  if(!hashPassword){
    console.error("Cannot hash the password. Try again.");
    return;
  }
  console.log("Hashed Password:", hashedPassword);

  const sql =
    "INSERT INTO users (fullname, username, password, salary, registration_date) VALUES (?, ?, ?, ?, ?)";
  const params = [
    fullname,
    username,
    hashedPassword,
    salary,
    registration_date,
  ];

  // Ensure DatabaseModule is initialized
  if (!DatabaseModule) {
    throw new Error("Database module is not initialized.");
  }

  try {
    // CHECK FOR ALREADY USERNAMES
    const checkUserSql = "SELECT id FROM users WHERE username = ?";
    const checkUserParams = [username];
    const checkUserResult = await DatabaseModule.executeQuery(
      checkUserSql,
      checkUserParams
    );

    if (checkUserResult.rows.length > 0) {
      showNotification(
        "Username already exists. Please choose a different username.",
        "info"
      );
      return;
    }

    // INSERT THE NEW USER TO DATABASE
    const resultSet = await DatabaseModule.executeQuery(sql, params);
    if (resultSet.rowsAffected > 0) {
      console.log("User signed up successfully with ID: " + resultSet.insertId);
      accountReload();
    } else {
      console.error("NEW USER ERROR: " + error.message);
      showNotification("Cannot signup, please try again.", "error");
    }
  } catch (error) {
    console.error("Cannot signup. Try Again.", error);
    showNotification("Failed to signup. Please try again.", "error");
  }
}
