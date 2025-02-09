"use strict";

import { newRoute } from "./routing.js";
import { showNotification } from "./notifications.js";

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

    // REAL-TIME CALCULATION | TOTAL BILL
    const valueBill = document.getElementById("hn-value");
    const quantityBill = document.getElementById("hn-quant-value");
    const totalBill = document.getElementById("hn-total");

    if(valueBill && quantityBill && totalBill){
      valueBill.addEventListener("input", calculateTotal);
      quantityBill.addEventListener("input", calculateTotal);
    } else {
      console.error("One or more input fields for calculation are missing.");
      showNotification("One or more input fields for calculation are missing.", "error");
    }
  },
  false
);

// FUNCTION TO CALCULATE TOTAL BILL
function calculateTotal(){
  const value = parseFloat(document.getElementById("hn-value").value.trim()) || 0;
  const quantity = parseFloat(document.getElementById("hn-quant-value").value.trim()) || 0;
  const totalInput = document.getElementById("hn-total");

  if(totalInput){
    const total = value * quantity;
    totalInput.value = total.toFixed(2);
  }
}

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

  // INPUT VALIDATION
  if (!description) {
    console.log("Please fill in the description field.");
    showNotification("Please fill in the description field.", "info");
    return;
  }
  // USER ID VALIDATION
  if (!userid) {
    console.log("User not logged in. Please sign in.");
    showNotification("User not logged in. Please sign in.", "info");
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
    showNotification("DatabaseBills is not initialized. Please check your setup.", "error");
  }

  try {
    // INSERT THE NEW BILL TO DATABASE
    const resultSet = await DatabaseBills.executeQuery(sql, params);
    if (resultSet.rowsAffected > 0) {
      console.log(
        "Bill saved successfully in database with ID: " + resultSet.insertId
      );
      showNotification("Bill saved successfully in database with ID: " + resultSet.insertId, "success");
      newRoute("./home.html");
    } else {
      console.error("Error inserting new bill into the database.");
      showNotification("Error inserting new bill into the database..", "error");
    }
  } catch (error) {
    console.error("Database unavailable, check your database: ", error);
    showNotification("Database unavailable, check your database.", "error");
  }
}

