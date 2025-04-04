"use strict";

import { accountBalance } from "./balance.js";
import { showNotification } from "./notifications.js";

document.addEventListener(
  "deviceready",
  () => {
    const mvList = document.getElementById("home-mv-list");
    if (mvList) {
      mvList.addEventListener("click", handleDeleteBill);
    } else {
      console.error("Element #home-mv-list not found.");
    }
  },
  false
);

// FUNCTION TO HANDLE BILL DELETION
async function handleDeleteBill(event) {
  const delButton = event.target.closest(".home-mvi-delete");
  if (!delButton) return;

  // EXTRACT BILL ID FROM ARIA-LABEL
  const billId = delButton.getAttribute("aria-label").replace("bill-", "");
  if (!billId) {
    console.error("No bill ID found for deletion");
    showNotification("No bill ID found for deletion.", "error");
    return;
  }

  // CONFIRM DELETION WITH THE USER
  const confirmDelete = confirm("Are you sure you want to delete this bill.");
  if (!confirmDelete) {
    return;
  }

  try {
    await deleteBillDB(billId);

    // REMOVE THE BILL ITEM FROM THE DOM
    const billItem = delButton.closest(".home-mv-item");
    if (billItem) {
      billItem.remove();
    }

    // UPDATE HOME BALANCE DATA
    await accountBalance();

    showNotification("Bill deleted successfully!", "success");
  } catch (error) {
    console.error("Error deleting bill: ", error.message);
    showNotification("Failed to delete bill. Please try again.", "error");
  }
}

// FUNCTION TO DELETE BILL FROM DATABASE
async function deleteBillDB(billId) {
  const sql = "DELETE FROM bills WHERE id = ?";
  const params = [billId];

  try {
    await DatabaseBills.executeQuery(sql, params);
    console.log(`Bill with ID ${billId} deleted successfully.`);
  } catch (error) {
    console.log("Error deleting bill from database: ", error.message);
    throw error;
  }
}
