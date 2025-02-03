"use strict";

document.addEventListener(
  "deviceready",
  async () => {
    try {
      // RETRIVE USER'S ID
      const userid = sessionStorage.getItem("actualSession");
      if (userid) {
        // SHOW BILL DATA
        await billData(userid);
      } else {
        alert("There is no user logged in with ID");
        throw new Error("No logged-in user, can't find ID");
      }
    } catch (error) {
      throw new Error(
        "An error occurred. Please check the console for details."
      );
    }
  },
  false
);

async function billData(userID) {
  const sql = "SELECT description, userid FROM bills WHERE userid = ?";
  const params = [userID];

  try {
    // ENSURE DATABASE BILLS IS INITIALIZED
    if (!DatabaseBills) {
      throw new Error(
        "Database bills is not initialized. Please check your setup."
      );
    }

    const resultSet = await DatabaseBills.executeQuery(sql, params);
    if (resultSet.rows.length > 0) {
      const user = resultSet.rows.item(0);
      console.log(user.description);
      console.log(user.userid);
    } else {
      throw new Error("No bills found for the logged-in user.");
    }
  } catch (error) {
    console.error(
      "An error occurred while fetching bill data. Please try again.",
      error.message
    );
    alert("An error occurred while fetching bill data. Please try again.");
    throw error;
  }
}
