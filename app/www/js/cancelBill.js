"use strict";

import { showNotification } from "./notifications.js";

document.addEventListener(
  "deviceready",
  () => {
    const cancelBtn = document.getElementById("g-hnb-cmd-c");

    // Check if the cancel button exists
    if (!cancelBtn) {
      console.error("Error: Cancel button not found.");
      return;
    }

    cancelBtn.addEventListener("click", () => {
      clearInputs();
    });
  },
  false
);

function clearInputs() {
  const description = document.getElementById("hn-description");
  const value = document.getElementById("hn-value");
  const date = document.getElementById("hn-date");
  const quantity = document.getElementById("hn-quant-value");

  // Check if all elements exist
  if (!description || !value || !date || !quantity) {
    console.error("Error: One or more DOM elements not found.");
    showNotification("Error: Cannot clear the fields. Required elements are missing.", "error");
    return; // Stop execution if any element is missing
  }

  try {
    description.value = "";
    value.value = "";
    date.value = "";
    quantity.value = "";

    console.log("Input fields cleared successfully.");
  } catch (error) {
    console.error("Error: Cannot clear the fields.", error);
    showNotification("Error: Cannot clear the fields. Please try again.", "error");
  }
}
