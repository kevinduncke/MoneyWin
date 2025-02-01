"use strict";

import { newRoute } from "../js/routing.js";

document.addEventListener("deviceReady", function () {
  const loginBtn = document.getElementById("login-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", handleLogin);
  }

  autoLogin();
});

// FUNCTION TO HANDLE LOGIN FORM
async function handleLogin() {
  const loginUsername = document.getElementById("login-username");
  const loginPassword = document.getElementById("login-password");
  const loginCheckbox = document.getElementById("login-remember");

  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();

  if (!username || !password) {
    alert("Please enter your username and password.");
    return;
  }

  try {
    const user = await authenticateUser(username, password);

    // IF AUTH IS SUCCESS
    if (loginCheckbox.checked) {
      await rememberUserSession(user.id);
    }

    loginSuccess();
  } catch (error) {
    console.error("Login error: ", error);
    alert(`Login error: ${error.message}`);
  }
}

// FUNCTION TO AUTH USER
async function authenticateUser(username, password) {
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  const params = [username, password];

  try {
    // Ensure DatabaseModule is initialized
    if (!DatabaseModule) {
      throw new Error("Database module is not initialized.");
    }    
    const resultSet = await DatabaseModule.executeQuery(sql, params);
    if (resultSet.rows.length > 0) {
      const user = resultSet.rows.item(0);

      if (username === user.username && password === user.password) {
        console.log("User signed in successfully.");
        return user;
      } else {
        throw new Error("Invalid credentials. Please try again.");
      }
    } else {
      throw new Error("Username not found.");
    }
  } catch (error) {
    throw new Error("Select Error: " + error.message);
  }
}

// FUNCTION CACHE USER SESSION
async function rememberUserSession(userId) {
  const sql = "UPDATE users SET logged_user = 1 WHERE id = ?";
  const params = [user.id];

  try {
    // Ensure DatabaseModule is initialized
    if (!DatabaseModule) {
      throw new Error("Database module is not initialized.");
    }
    await DatabaseModule.executeQuery(sql, params);
    console.log("User session remembered successfully.");
  } catch (error) {
    throw new Error("Update Error: " + error.message);
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
    const user = await getLoggedInUser();
    if (user) {
      console.log("User logged in automatically");
      loginSuccess();
    }
  } catch (error) {
    console.error("Auto-login error: ", error);
  }
}

// FUNCTION TO GET LOGGED IN
async function getLoggedInUser() {
  const sql = "SELECT * FROM users WHERE logged_user = 1";

  try {
    // Ensure DatabaseModule is initialized
    if (!DatabaseModule) {
      throw new Error("Database module is not initialized.");
    }    
    const resultSet = await DatabaseModule.executeQuery(sql);
    if (resultSet.rows.length > 0) {
      return resultSet.rows.item(0);
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Select Error: " + error.message);
  }
}
