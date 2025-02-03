"use strict";

document.addEventListener(
  "deviceready",
  async () => {
    try {
      // RETRIVE USER'S ID
      const userId = sessionStorage.getItem("actualSession");
      if (userId) {
        // SET ACCOUNT DATA
        await accountData(userId);
      } else {
        throw new Error("No logged-in user found.");
      }
    } catch (error) {
      throw new Error(
        "An error occurred. Please check the console for details."
      );
    }
  },
  false
);

// CONSTRUCTOR FUNCTION SET ELEMENT TEXT
export function setElementText(elementId, text) {
  const element = document.getElementById(elementId);
  if (element) {
    element.value = text;
  } else {
    console.log("Element with ID '" + elementId + "' not found.");
  }
}

// FUNCTION SET ACCOUNT USER DATA
async function accountData(userId) {
  const sql =
    "SELECT fullname, username, password, salary FROM users WHERE id = ?";
  const params = [userId];

  try {
    // Ensure DatabaseModule is initialized
    if (!DatabaseModule) {
      throw new Error(
        "Database module is not initialized. Please check your setup."
      );
    }
    const resultSet = await DatabaseModule.executeQuery(sql, params);
    if (resultSet.rows.length > 0) {
      const user = resultSet.rows.item(0);
      setElementText("account-name", user.fullname);
      setElementText("account-username", user.username);
      setElementText("account-password", user.password);
      setElementText("account-salary", user.salary);
    } else {
      throw new Error("No user found with the provided ID.");
    }
  } catch (error) {
    alert(error);
    console.error("Error executing query: ", error);
    throw error;
  }
}
