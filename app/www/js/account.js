"use strict";

document.addEventListener(
  "deviceready",
  async () => {
    try {
      // SET ACCOUNT DATA
      await accountData();
    } catch (error) {
      console.error("Error in account.js: ", error);
      alert("An error occurred. Please check the console for details.");
    }
  },
  false
);

// CONSTRUCTOR FUNCTION SET ELEMENT TEXT
function setElementText(elementId, text) {
  const element = document.getElementById(elementId);
  if (element) {
    element.value = text;
  } else {
    console.log("Element with ID '" + elementId + "' not found.");
  }
}

// FUNCTION SET ACCOUNT USER DATA
async function accountData() {
  const sql =
    "SELECT fullname, username, password, salary FROM users WHERE logged_user = 1";
  const params = [];

  try {
    // Ensure DatabaseModule is initialized
    if (!DatabaseModule) {
      throw new Error("Database module is not initialized.");
    }    
    const resultSet = await DatabaseModule.executeQuery(sql, params);
    if (resultSet.rows.length > 0) {
      const user = resultSet.rows.item(0);
      setElementText("account-name", user.fullname);
      setElementText("account-username", user.username);
      setElementText("account-password", user.password);
      setElementText("account-salary", user.salary);
    } else {
      console.log("No user is currently logged in.");
    }
  } catch (error) {
    alert(error);
    console.error("Error executing query: ", error);
    throw error;
  }
}
