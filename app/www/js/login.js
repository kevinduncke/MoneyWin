"use strict";

import { newRoute } from "../js/routing.js";

document.addEventListener("deviceReady", function () {
  const loginBtn = document.getElementById("login-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", login);
  }
  autoLogin();
});

function login() {
  const loginUsername = document.getElementById("login-username");
  const loginPassword = document.getElementById("login-password");
  const loginCheckbox = document.getElementById("login-remember");

  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();

  if (!username || !password) {
    alert("Please enter your username and password.");
    return;
  }

  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password],
      function (tx, resultSet) {
        if (resultSet.rows.length > 0) {
          const user = resultSet.rows.item(0);
          const dbUsername = user.username;
          const dbPassword = user.password;

          if (username === dbUsername && password === dbPassword) {
            console.log("User signed in successfully.");
            if (loginCheckbox.checked) {
              db.transaction(function (tx) {
                tx.executeSql(
                  "UPDATE users SET logged_user = 1 WHERE id = ?",
                  [user.id],
                  function (tx, res) {
                    console.log("User session remembered successfully.");
                  }
                );
              });
            }
            loginSuccess();
          } else {
            console.log("Invalid credentials. Please try again.");
          }
        } else {
          console.log("Username not found.");
        }
      },
      function (error) {
        console.log("SELECT ERROR: " + error.message);
      }
    );
  });
}

function loginSuccess() {
  const appLogin = document.getElementById("app-login");
  const appLoginStatus = document.getElementById("app-login-status");

  appLogin.style.display = "none";
  appLoginStatus.style.display = "block";

  newRoute("./pages/home.html");
}

function autoLogin() {
  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM users WHERE logged_user = 1",
      [],
      function (tx, resultSet) {
        const lg_value = resultSet.rows.item(0);
        if(lg_value){
          console.log("User logged in automatically");
          loginSuccess();
        }
      },
      function (error) {
        console.log(error.message);
      }
    );
  });
}
