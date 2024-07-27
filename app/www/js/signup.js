"use strict";

import { newUser } from "./account.js";
import { newRoute } from "./routing.js";

document.getElementById("signup-btn").addEventListener("click", () => {
  const fullname = document.getElementById("signup-fullname").value;
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;
  const salary = document.getElementById("signup-salary").value;

  if (localStorage.getItem(`${username}-USERNAME`)) {
    accountReload();
  } else {
    newUser({ fullname, username, password, salary });
    accountReload();
  }

  function accountReload() {
    document.getElementById("app-signup").style.display = "none";
    document.getElementById("app-signup-status").style.display = "block";

    newRoute("../index.html");
  }
});
