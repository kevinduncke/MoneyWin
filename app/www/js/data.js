import { balance, bills, calendar, currency } from "../js/utils.js";
import { time } from "../js/utils.js";

(() => {
  const userKey = localStorage.getItem("LOGGED_USER");

  if (userKey) {
    // =========================
    // HOME | STATUS BAR
    // =========================
    // USER FULLNAME
    document.getElementById(
      "home-username"
    ).innerText = `${localStorage.getItem(`${userKey}-FULLNAME`)}`;
    // DATE & TIME SYSTEM
    const fullDate = calendar();
    document.getElementById(
      "home-date"
    ).innerText = `${fullDate.day}/${fullDate.month}/${fullDate.year}`;
    const fullTime = time();
    document.getElementById(
      "home-time"
    ).innerText = `${fullTime.hour}:${fullTime.minutes} ${fullTime.id}`;

    // =========================
    // HOME | DATEVIEW
    // =========================
    // MONTH VIEW
    const mthView = document.getElementById("home-month-filter");
    if (mthView) {
      mthView.innerText = `${fullDate.stringMonth}`;
    }
    // ACCOUNT BALANCE
    const accBalance = document.getElementById("bvi-account");
    if (accBalance) {
      accBalance.innerText = currency().format(balance());
    }
    // BILLS TOTAL
    const accBills = document.getElementById("bvi-bills");
    if (accBills) {
      accBills.innerText = currency().format(localStorage.getItem(`${userKey}-BILLS`));
    }
    // CREDIT CARD
    const accCredit = document.getElementById("bvi-credit");
    if (accCredit) {
      accCredit.innerText = currency().format(localStorage.getItem(`${userKey}-CARDS`));
    }

    // =========================
    // ACCOUNT | INFORMATION
    // =========================
    // FULLNAME
    const accName = document.getElementById("account-name");
    if (accName) {
      accName.value = `${localStorage.getItem(`${userKey}-FULLNAME`)}`;
    }
    // USERNAME
    const accUsername = document.getElementById("account-username");
    if (accUsername) {
      accUsername.value = userKey;
    }
    // PASSWORD
    const accPassword = document.getElementById("account-password");
    if (accPassword) {
      accPassword.value = `${localStorage.getItem(`${userKey}-PASSWORD`)}`;
    }
    // SALARY
    const accSalary = document.getElementById("account-salary");
    if (accSalary) {
      accSalary.value = `${localStorage.getItem(`${userKey}-SALARY`)}`;
    }
  }
})();
