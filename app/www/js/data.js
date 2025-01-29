import { balance, bills, calendar, currency, time } from "../js/utils.js";

(() => {
  const userKey = localStorage.getItem("LOGGED_USER");

  if (userKey) {
    const setElementText = (elementId, text) => {
      const element = document.getElementById(elementId);
      if (element) {
        element.innerText = text;
      }
    };

    const setElementValue = (elementId, value) => {
      const element = document.getElementById(elementId);
      if (element) {
        element.value = value;
      }
    };

    const getLocalStorageItem = (key) => {
      return localStorage.getItem(`${userKey}-${key}`);
    };

    // HOME | STATUS BAR
    // USER FULLNAME
    setElementText("home-username", getLocalStorageItem("FULLNAME"));
    // DATE & TIME SYSTEM
    const fullDate = calendar();
    setElementText(
      "home-date",
      `${fullDate.day}/${fullDate.month}/${fullDate.year}`
    );
    setInterval(() => {
      const fullTime = time();
      setElementText("home-time", `${fullTime.hour}:${fullTime.minutes} ${fullTime.id}`);
    }, 1000);

    // HOME | DATEVIEW
    // MONTH VIEW
    setElementText("home-month-filter", fullDate.stringMonth);
    // ACCOUNT BALANCE
    setElementText("bvi-account", currency().format(balance()));
    // BILLS TOTAL
    setElementText("bvi-bills", currency().format(getLocalStorageItem("BILLS")));
    // CREDIT CARD
    setElementText("bvi-credit", currency().format(getLocalStorageItem("CARDS")));

    // ACCOUNT | INFORMATION
    // FULLNAME
    setElementValue("account-name", getLocalStorageItem("FULLNAME"));
    // USERNAME
    setElementValue("account-username", userKey);
    // PASSWORD
    setElementValue("account-password", getLocalStorageItem("PASSWORD"));
    // SALARY
    setElementValue("account-salary", getLocalStorageItem("SALARY"));
  }
})();
