"use strict";

document.getElementById("signup-btn").addEventListener("click", () => {
  const fullname = document.getElementById("signup-fullname").value;
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  if (localStorage.getItem(`${username}-USERNAME`)) {
    accountReload();
  } else {
    localStorage.setItem(`${username}-FULLNAME`, fullname);
    localStorage.setItem(`${username}-USERNAME`, username);
    localStorage.setItem(`${username}-PASSWORD`, password);

    accountReload();
  }

  function accountReload(){
    document.getElementById("app-signup").style.display = "none";
    document.getElementById("app-signup-status").style.display = "block";

    setTimeout(() => {
      location.replace("../index.html");
    }, 3000);
  }
});
