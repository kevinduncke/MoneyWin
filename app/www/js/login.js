"use strict";

import { newRoute } from "../js/routing.js";
import { hashPassword } from "./hashing.js";
import { showNotification } from "./notifications.js";

document.addEventListener("deviceready", function () {
  const loginBtn = document.getElementById("login-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", handleLogin);
  }

  autoLogin();
});

// FUNCTION TO VERIFY PASSWORD
async function verifyPassword(inputPassword, storedHash) {
  const inputHash = await hashPassword(inputPassword);
  return inputHash === storedHash;
}

// FUNCTION TO HANDLE LOGIN FORM
async function handleLogin() {
  const loginUsername = document.getElementById("login-username");
  const loginPassword = document.getElementById("login-password");
  const loginCheckbox = document.getElementById("login-remember");

  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();

  if (!username || !password) {
    showNotification("Please enter your username and password.", "info");
    return;
  }

  try {
    const user = await authenticateUser(username, password);

    // IF AUTH IS SUCCESS
    if (loginCheckbox.checked) {
      localStorage.setItem("rememberUserId", user.id);
    } else {
      localStorage.removeItem("rememberUserId");
    }
    sessionStorage.setItem("actualSession", user.id);
    loginSuccess();
  } catch (error) {
    console.error("Login error: ", error);
    showNotification(`Login error: ${error.message}`, "error");
  }
}

// FUNCTION TO AUTH USER
async function authenticateUser(username, password) {
  const sql = "SELECT id, password FROM users WHERE username = ?";
  const params = [username];

  try {
    // Ensure DatabaseModule is initialized
    if (!DatabaseModule) {
      showNotification("Error trying to fetch data in database.", "error");
      throw new Error("Database module is not initialized.");
    }
    const resultSet = await DatabaseModule.executeQuery(sql, params);
    if (resultSet.rows.length > 0) {
      const user = resultSet.rows.item(0);
      const hashedPassword = user.password;
      // Verify the password
      const isMatch = await verifyPassword(password, hashedPassword);

      if (isMatch) {
        console.log("Login successful!");
        showNotification("Login successful!", "success");
        return user;
      } else {
        console.log("Invalid username or password.");
        showNotification("Invalid username or password.", "error");
      }
    } else {
      console.log("User not found.");
      showNotification("User not found", "error");
    }
  } catch (error) {
    console.error("Login error: ", error);
    showNotification("Failed to login. Please try again.", "error");
  }
}

// FUNCTION TO HANDLE SUCCESSFULLY LOGIN
function loginSuccess() {
  const appLogin = document.getElementById("app-login");
  const appLoginStatus = document.getElementById("app-login-status");

  appLogin.style.display = "none";
  appLoginStatus.style.display = "block";

  newRoute("./pages/home.html");
}

// FUNCTION TO AUTOLOG USER SESSION
async function autoLogin() {
  try {
    const rememberUserId = localStorage.getItem("rememberUserId");
    if (!rememberUserId) return;

    const user = await getUserById(rememberUserId);
    if (user) {
      console.log("User logged in automatically");
      sessionStorage.setItem("actualSession", user.id);
      loginSuccess();
    } else {
      localStorage.removeItem("rememberUserId");
    }
  } catch (error) {
    console.error("Auto-login error: ", error);
    showNotification("An error occurred during auto-login.", "error");
  }
}

// FUNCTION TO GET LOGGED IN
async function getUserById(userId) {
  const sql = "SELECT * FROM users WHERE id = ?";
  const params = [userId];
  try {
    // Ensure DatabaseModule is initialized
    if (!DatabaseModule) {
      throw new Error("Database module is not initialized.");
    }
    const resultSet = await DatabaseModule.executeQuery(sql, params);
    if (resultSet.rows.length > 0) {
      return resultSet.rows.item(0);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Database error: ", error);
    throw new Error("An error occurred while processing your request.");
  }
}
