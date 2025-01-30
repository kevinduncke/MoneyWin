import { calendar, time } from "../js/utils.js";

document.addEventListener("deviceReady", () => {
  let username;

  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT username FROM users WHERE logged_user = 1",
      [],
      function (tx, resultSet) {
        if (resultSet.rows.length > 0) {
          // CHECK THE HOME DISPLAY USERNAME HERE
          username = resultSet.rows.item(0);
        } else {
          console.log("No user is currently logged in.");
        }
      },
      function (error) {
        console.log("SELECT ERROR: " + error.message);
      }
    );
  });

  const setElementText = (elementId, text) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerText = text;
    }
  };

  // HOME | STATUS BAR
  // USER FULLNAME
  setElementText("home-username", username);

  // DATE & TIME SYSTEM
  const fullDate = calendar();
  setElementText(
    "home-date",
    `${fullDate.day}/${fullDate.month}/${fullDate.year}`
  );
  setInterval(() => {
    const fullTime = time();
    setElementText(
      "home-time",
      `${fullTime.hour}:${fullTime.minutes} ${fullTime.id}`
    );
  }, 1000);

  // HOME | DATEVIEW
  // MONTH VIEW
  setElementText("home-month-filter", fullDate.stringMonth);
  // ACCOUNT BALANCE
  // setElementText("bvi-account", currency().format(balance()));
});
