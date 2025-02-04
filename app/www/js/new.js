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
  const value = document.getElementById("hn-value").value.trim();
  const payment = document.getElementById("hn-payment").value;
  const currency = document.getElementById("hn-currency").value;
  const date = document.getElementById("hn-date").value;
  const quantity = document.getElementById("hn-quant-value").value.trim();
  const total = document.getElementById("hn-total").value.trim();
  const type = document.getElementById("hn-typeBill").value;
  const userid = sessionStorage.getItem("actualSession");

  console.log(description);
  console.log(value);
  console.log(payment);
  console.log(currency);
  console.log(date);
  console.log(quantity);
  console.log(total);
  console.log(type);

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

  const sql =
    "INSERT INTO bills (description, value, payment, currency, date, quantity, total, type, userid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const params = [
    description,
    value,
    payment,
    currency,
    date,
    quantity,
    total,
    type,
    userid,
  ];

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
