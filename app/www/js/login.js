"use strict";

import { getUser } from "../js/account.js";
import { newRoute } from "../js/routing.js";

document.getElementById("login-btn").addEventListener("click", () => {
  const loginUsername = document.getElementById("login-username").value;
  const loginPassword = document.getElementById("login-password").value;
  const loginCheckbox = document.getElementById("login-remember");

  const data = getUser({
    loginUsername
  });

  if (data.key_username) {
    if (
      loginUsername === data.key_username &&
      loginPassword === data.key_password
    ) {
      localStorage.setItem('LOGGED_USER', data.key_username);

      document.getElementById("app-login").style.display = "none";
      document.getElementById("app-login-status").style.display = "block";

      newRoute("./pages/home.html");
    }
  }
});
