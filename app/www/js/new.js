"use strict";

document.addEventListener(
  "deviceready",
  () => {
    const saveBillBtn = document.getElementById("g-hnb-cmd-s");
    if (saveBillBtn) {
      saveBillBtn.addEventListener("click", () => {
        newBill();
      });
    } else {
      console.error("Save bill button not found in the DOM.");
    }
  },
  false
);

// FUNCTION TO INSERT NEW BILL TO DATABASE
async function newBill() {
  const description = document.getElementById("hn-description").value.trim();
  const userid = sessionStorage.getItem("actualSession");

  // INPUT VALIDATION
  if (!description) {
    console.log("Please fill in the description field.");
    alert("Please fill in the description field.");
    return;
  }
  // USER ID VALIDATION
  if (!userid) {
    console.log("User not logged in. Please sign in.");
    alert("User not logged in. Please sign in.");
    return;
  }

  const sql = "INSERT INTO bills (description, userid) VALUES (?, ?)";
  const params = [description, userid];

  // Ensure DatabaseModule is initialized
  if (!DatabaseBills) {
    console.error("DatabaseBills is not initialized. Please check your setup.");
    alert("DatabaseBills is not initialized. Please check your setup.");
  }

  try {
    // INSERT THE NEW BILL TO DATABASE
    const resultSet = await DatabaseBills.executeQuery(sql, params);
    if (resultSet.rowsAffected > 0) {
      console.log(
        "Bill saved successfully in database with ID: " + resultSet.insertId
      );
    } else {
      console.error("Error inserting new bill into the database.");
      alert("Error inserting new bill into the database..");
    }
  } catch (error) {
    console.error("Database unavailable, check your database: ", error);
    alert("Database unavailable, check your database.");
  }
}
