"use strict";

import { hashPassword } from "./hashing.js";
import { showNotification } from "./notifications.js";

document.addEventListener(
  "deviceready",
  () => {
    // CACHE DOM ELEMENT
    const fllnmEditBtn = document.getElementById("fllnm-edit-btn");
    const fllnmSaveBtn = document.getElementById("fllnm-save-btn");
    const passwordEditBtn = document.getElementById("password-edit-btn");
    const passwordSaveBtn = document.getElementById("password-save-btn");
    const salaryEditBtn = document.getElementById("salary-edit-btn");
    const salarySaveBtn = document.getElementById("salary-save-btn");

    // EVENT LISTENERS | EDIT BUTTONS
    fllnmEditBtn.addEventListener("click", function () {
      editData("fullname");
    });
    fllnmSaveBtn.addEventListener("click", function () {
      saveData("fullname");
    });
    passwordEditBtn.addEventListener("click", function () {
      editData("password");
    });
    passwordSaveBtn.addEventListener("click", function () {
      saveData("password");
    });
    salaryEditBtn.addEventListener("click", function () {
      editData("salary");
    });
    salarySaveBtn.addEventListener("click", function () {
      saveData("salary");
    });
  },
  false
);

// FUNCTION TO ENABLE INPUT FIELDS FOR EDITING USER DATA
function editData(id) {
  // CALL AND PASS THE ID PARAMETER
  const elements = getElements(id);

  if (elements) {
    elements.input.disabled = false;
    elements.editBtn.style.display = "none";
    elements.saveBtn.style.display = "block";
  } else {
    console.error("Invalid ID");
  }
}

// FUNCTION TO SAVE EDITED USER DATA
async function saveData(id) {
  const elements = getElements(id);

  if (elements) {
    elements.input.disabled = true;
    elements.editBtn.style.display = "block";
    elements.saveBtn.style.display = "none";

    let newValue = elements.input.value.trim();
    if(id === 'password'){
      newValue = await hashPassword(newValue);
    }

    if (!newValue) {
      showNotification("Please enter a valid value.", "info");
      return;
    }

    await updateDatabase(id, newValue);
  } else {
    console.error("Invalid ID");
  }
}

// HELPER FUNCTION TO RETURN ELEMENTS BASED ON ID
function getElements(id) {
  switch (id) {
    case "fullname":
      return {
        input: document.getElementById("account-name"),
        editBtn: document.getElementById("fllnm-edit-btn"),
        saveBtn: document.getElementById("fllnm-save-btn"),
      };
    case "password":
      return {
        input: document.getElementById("account-password"),
        editBtn: document.getElementById("password-edit-btn"),
        saveBtn: document.getElementById("password-save-btn"),
      };
    case "salary":
      return {
        input: document.getElementById("account-salary"),
        editBtn: document.getElementById("salary-edit-btn"),
        saveBtn: document.getElementById("salary-save-btn"),
      };
    default:
      return null;
  }
}

// FUNCTION TO GET THE ID OF THE LOGGED-IN USER
async function getLoggedInUserId() {
  try {
    // RETRIVE USER'S ID
    const userId = sessionStorage.getItem("actualSession");
    if(userId){
      return userId;
    } else {
      throw new Error("User ID not found in local storage.");
    }
  } catch (error) {
    showNotification("Error in editData.js", "error");
    throw new Error("An error occurred. Please check the console for details.");
  }
}

// FUNCTION TO UPDATE THE DATABASE
async function updateDatabase(field, newValue) {
  try {
    // GET THE LOGGED-IN USER'S ID
    const loggedInUserId = await getLoggedInUserId();

    // CONSTRUCT THE SQL QUERY
    let sql;
    switch (field) {
      case "fullname":
        sql = "UPDATE users SET fullname = ? WHERE id = ?";
        break;
      case "password":
        sql = "UPDATE users SET password = ? WHERE id = ?";
        break;
      case "salary":
        sql = "UPDATE users SET salary = ? WHERE id = ?";
        break;
      default:
        throw new Error("Invalid field specified.");
    }

    // EXECUTE THE SQL Query
    // Ensure DatabaseModule is initialized
    if (!DatabaseModule) {
      throw new Error("Database module is not initialized.");
    }
    const resultSet = await DatabaseModule.executeQuery(sql, [
      newValue,
      loggedInUserId,
    ]);

    // CHECK IF THE UPDATE WAS SUCCESSFUL
    if (resultSet.rowsAffected > 0) {
      console.log("Database updated successfully.");
      showNotification("Data saved successfully.", "success");
    } else {
      console.error("No rows were updated. Check the user ID and field values.");
      showNotification("No changes were made. Please check your input.", "error");
    }
  } catch (error) {
    console.error(error);
  }
}
