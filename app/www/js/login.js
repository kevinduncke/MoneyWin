"use strict";

import { getUser } from "../js/account.js";
import { newRoute } from "../js/routing.js";

const loginBtn = document.getElementById("login-btn");
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginCheckbox = document.getElementById("login-remember");
const appLogin = document.getElementById("app-login");
const appLoginStatus = document.getElementById("app-login-status");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();

    if (!username || !password) {
      alert("Please enter your username and password.");
      return;
    }

    const data = getUser({ loginUsername: username });

    if (data && data.key_username === username) {
      if (data.key_password === password) {
        localStorage.setItem("LOGGED_USER", data.key_username);

        if (loginCheckbox.checked) {
          localStorage.setItem("REMB_USER", data.key_username);
        }

        appLogin.style.display = "none";
        appLoginStatus.style.display = "block";

        newRoute("./pages/home.html");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } else {
      alert("Username not found.");
    }
  });
}

const logoutBtn = document.getElementById("logout-btn");

if(logoutBtn){
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("LOGGED_USER");
    localStorage.removeItem("REMB_USER");
    newRoute("../index.html");
  });
}