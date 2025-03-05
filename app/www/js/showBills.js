"use strict";

import { showNotification } from "./notifications.js";
import { getSalaryBalance } from "./saveBalances.js";
import { currency } from "./utils.js";

document.addEventListener(
  "deviceready",
  async () => {
    try {
      await renderBill();
    } catch (error) {
      console.error("Error in deviceready event:", error.message);
      showNotification("An error occurred. Please check the console for details.", "error");
    }
  },
  false
);

// FUNCTION TO FETCH LOGGED USER ID
async function getLoggedUserId() {
  // RETRIVE USER'S ID
  const userid = sessionStorage.getItem("actualSession");
  if (userid) {
    console.log("User ID found: " + userid);
    return userid;
  } else {
    showNotification("There is no user logged in with ID", "error");
    throw new Error("No logged-in user, can't find ID");
  }
}

// FUNCTION TO FETCH BILLS DATA FROM DATABASE
async function billData(userID) {
  const sql =
    "SELECT description, value, payment, currency, date, id FROM bills WHERE userid = ?";
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
      const bills = [];
      for (let i = 0; i < resultSet.rows.length; i++) {
        bills.push(resultSet.rows.item(i));
      }
      return bills;
    } else {
      console.log("No bills found for the logged-in user.");
    }
  } catch (error) {
    console.error(
      "An error occurred while fetching bill data. Please try again.",
      error.message
    );
    throw error;
  }
}

// FUNCTION TO SANITIZE USER-GENERATED DATA
function sanitize(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// FUNCTION TO GENERATE HTML ITEM TEMPLATE FOR BILL DATA
async function generateBillItem(bill) {
  let salaryValue = await getSalaryBalance(sessionStorage.getItem("actualSession"));

  return `
    <div class="home-mv-item">
      <button 
        id="delete-bill-${sanitize(bill.id.toString())}" 
        class="home-mvi-delete" 
        aria-label="bill-${sanitize(bill.id.toString())}"
        >
          <div class="home-mvi-icon">${sanitize(bill.id.toString())}</div>
      </button>  
      <div class="home-mvi-info">
        <div class="home-mvi-dcpt">
          <h2 class="home-mvi-h2">
            ${sanitize(bill.description || "Unknown")}
          </h2>
          <span class="home-mvi-span">
            ${sanitize(bill.date || "Missing Date")}
          </span>
          <span class="home-mvi-span"> · </span>
          <span class="home-mvi-span">
            ${sanitize(bill.payment || "No Payment Method")}
          </span>
          <span class="home-mvi-span"> · </span>
          <span class="home-mvi-span">
            ${sanitize(bill.currency || "@")}
          </span>
        </div>
        <div class="home-mvi-right">
          <div class="home-mvi-balance">
            <h2 class="home-mvi-h2">
              - ${sanitize(currency(bill.value) || "0.00")}
            </h2>
          </div>    
          <span>${sanitize(currency(salaryValue.salaryBalance))}</span>    
        </div>
      </div>
    </div>
  `;
}

// FUNCTION TO RENDER BILLS
async function renderBill() {
  try {
    const userid = await getLoggedUserId();
    const bills = await billData(userid);
    const mv_table = document.getElementById("home-mv-list");

    if (!mv_table) {
      console.error("Element #home-mv-list not found.");
      return;
    }

    // Clear existing content
    mv_table.innerHTML = "";

    // Append each bill to the list
    if(bills){
      for (const bill of bills) {
        console.log(
          "USER BILL DATA ID " + bill.id + ", DESCRIPTION: " + bill.description
        );
        const billItemHTML = await generateBillItem(bill); // Generate the HTML for each bill
        mv_table.insertAdjacentHTML("beforeend", billItemHTML); // Insert the generated HTML into the DOM
      };
    } else {
      console.log("No bills yet.");
      const mv_table = document.getElementById("home-mv-list");
      mv_table.innerText = "No bills yet.";
      mv_table.style.textAlign = "center";
    }
  } catch (error) {
    console.error("Error rendering bills:", error.message);
  }
}
