import { calendar, time } from "./utils.js";

document.addEventListener("deviceReady", () => {
  try {
    // HOME | STATUS BAR
    setFullname();

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
  } catch (error) {
    console.error("Error in homebar.js: ", error);
    alert("An error occurred. Please check the console for details.");
  }
});

// CONSTRUCTOR FUNCTION SET ELEMENT TEXT
function setElementText(elementId, text) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerText = text;
  } else {
    console.log("Element with ID '" + elementId + "' not found.");
  }
}

// FUNCTION SET FULLNAME TO HOME BAR STATUS
async function setFullname() {
  const loggedInUserId = sessionStorage.getItem("actualSession");
  const sql = "SELECT fullname FROM users WHERE id = ?";
  const params = [loggedInUserId];

  try {
    // Ensure DatabaseModule is initialized
    if (!DatabaseModule) {
      throw new Error("Database module is not initialized.");
    }
    const resultSet = await DatabaseModule.executeQuery(sql, params);
    if (resultSet.rows.length > 0) {
      const user = resultSet.rows.item(0);
      setElementText("home-username", user.fullname);
    } else {
      alert("No user is currently logged in.");
      throw new Error("No user is currently logged in.");
    }
  } catch (error) {
    alert(error);
    console.error("Error executing query: ", error);
    throw error;
  }
}
