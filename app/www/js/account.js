"use strict";

export function newUser(data) {
  localStorage.setItem(`${data.username}-FULLNAME`, data.fullname);
  localStorage.setItem(`${data.username}-USERNAME`, data.username);
  localStorage.setItem(`${data.username}-PASSWORD`, data.password);
  localStorage.setItem(`${data.username}-SALARY`, data.salary);
  localStorage.setItem(`${data.username}-BILLS`, 0);
  localStorage.setItem(`${data.username}-CARDS`, 0);
}

export function getUser(data) {
  let key_username = localStorage.getItem(`${data.loginUsername}-USERNAME`);
  let key_password = localStorage.getItem(`${data.loginUsername}-PASSWORD`);

  return { key_username, key_password };
}


