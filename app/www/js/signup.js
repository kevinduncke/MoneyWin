"use strict";

import { newUser } from "./account.js";
import { newRoute } from "./routing.js";

document.getElementById("signup-btn").addEventListener("click", handleSignUp);

function handleSignUp() {
  const fullname = document.getElementById("signup-fullname").value.trim();
  const username = document.getElementById("signup-username").value.trim();
  const password = document.getElementById("signup-password").value.trim();
  const salary = document.getElementById("signup-salary").value.trim();

  if(!fullname || !username || !password || !salary) {
    alert("Please fill all fields");
    return;
  }

  if(localStorage.getItem(`${username}-USERNAME`)) {
    accountReload();
  } else {
    newUser({ fullname, username, password, salary });
    accountReload();
  }
};

function accountReload() {
  document.getElementById("app-signup").style.display = "none";
  document.getElementById("app-signup-status").style.display = "block";

  newRoute("../index.html");
}