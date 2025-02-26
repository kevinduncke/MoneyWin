"use strict";

import { showNotification } from "./notifications.js";

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
      throw new Error("No bills found for the logged-in user.");
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
function generateBillItem(bill) {
  return `
    <div class="home-mv-item">
      <div class="home-mvi-icon">${sanitize(bill.id.toString())}</div>
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
            <h2 class="home-mvi-h2 home-mvi-red">
              $${sanitize(bill.value || "0.00")}
            </h2>
          </div>        
          <button 
            id="delete-bill-${sanitize(bill.id.toString())}" 
            class="home-mvi-delete" 
            aria-label="bill-${sanitize(bill.id.toString())}"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x"
              viewBox="0 0 16 16"
            >
            <path
              d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 
              .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 
              2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
            />
            </svg>
          </button>
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
    bills.forEach((bill) => {
      console.log(
        "USER BILL DATA ID " + bill.id + ", DESCRIPTION: " + bill.description
      );
      const billItemHTML = generateBillItem(bill); // Generate the HTML for each bill
      mv_table.insertAdjacentHTML("beforeend", billItemHTML); // Insert the generated HTML into the DOM
    });
  } catch (error) {
    console.error("Error rendering bills:", error.message);
    const mv_table = document.getElementById("home-mv-list");
    mv_table.innerText = "No bills yet.";
  }
}
