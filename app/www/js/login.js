"use strict";

document.getElementById("login-btn").addEventListener("click", () => {
  const loginUsername = document.getElementById("login-username").value;
  const loginPassword = document.getElementById("login-password").value;
  const loginCheckbox = document.getElementById("login-remember");

  let key_username = localStorage.getItem(`${loginUsername}-USERNAME`);
  let key_password = localStorage.getItem(`${loginUsername}-PASSWORD`);

  if (key_username) {
    if (loginUsername === key_username && loginPassword === key_password) {
      document.getElementById("app-login").style.display = "none";
      document.getElementById("app-login-status").style.display = "block";

      setTimeout(() => {
        location.replace("./pages/home.html");
      }, 3000);
    }
  }
});
