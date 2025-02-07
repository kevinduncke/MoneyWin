"use strict";

import { currency } from "./utils.js";

document.addEventListener(
  "deviceready",
  async () => {
    try {
      accountBalance();
    } catch (error) {
      console.error("Error in deviceready event:", error.message);
      alert("An error occurred. Please check the console for details.");
    }
  },
  false
);

// FUNCTION TO GET ACCOUNT BALANCE
async function accountBalance() {
  try {
    const userID = await getLogUserId();
    const totalBalance = await billsBalance(userID);
    const totalCredit = await creditBalance(userID);
    const totalSalary = await salaryBalance(userID, totalBalance);

    // DISPLAY SALARY BALANCE
    const salaryTotal = document.getElementById("bvi-account");
    if (salaryTotal) {
      salaryTotal.textContent = currency(totalSalary.toFixed(2));
    } else {
      console.error("Salary element not found in the DOM.");
    }

    // DISPLAY THE TOTAL BALANCE
    const billsTotal = document.getElementById("bvi-bills");
    if (billsTotal) {
      billsTotal.textContent = currency(totalBalance.toFixed(2));
    } else {
      console.error("Bill Total element not found in the DOM.");
    }

    // DISPLAY THE CREDIT BALANCE
    const creditTotal = document.getElementById("bvi-credit");
    if (creditTotal) {
      creditTotal.textContent = currency(totalCredit.toFixed(2));
    } else {
      console.error("Credit Total element not found in the DOM.");
    }
  } catch (error) {
    console.error("Failed to fetch accoun balance:", error.message);
  }
}

// FUNCTION TO GET SALARY BALANCE
async function salaryBalance(id, bills) {
  const sql = "SELECT salary FROM users WHERE id = ?";
  const params = [id];

  try {
    // ENSURE DATABASE BILLS IS INITIALIZED
    if (!DatabaseModule) {
      throw new Error(
        "Database bills is not initialized. Please check your setup."
      );
    }

    const resultSet = await DatabaseModule.executeQuery(sql, params);
    if (resultSet.rows.length > 0) {
      const resultSalary = new Number(resultSet.rows.item(0).salary);
      const resultBills = new Number(bills);
      const acutalSalary = resultSalary - resultBills;
      return acutalSalary;
    } else {
      return 0;
    }
  } catch (error) {
    console.error(
      "An error occurred while fetching bill data. Please try again.",
      error.message
    );
    throw error;
  }
}

// FUNCTION TO GET TOTAL BILLS BALANCE
async function billsBalance(id) {
  const sql = "SELECT total FROM bills WHERE userid = ?";
  const params = [id];

  try {
    // ENSURE DATABASE BILLS IS INITIALIZED
    if (!DatabaseBills) {
      throw new Error(
        "Database bills is not initialized. Please check your setup."
      );
    }

    const resultSet = await DatabaseBills.executeQuery(sql, params);
    if (resultSet.rows.length > 0) {
      let totalBalance = 0;
      for (let i = 0; i < resultSet.rows.length; i++) {
        totalBalance += resultSet.rows.item(i).total;
      }
      return totalBalance;
    } else {
      return 0;
    }
  } catch (error) {
    console.error(
      "An error occurred while fetching bill data. Please try again.",
      error.message
    );
    throw error;
  }
}

// FUNCTION TO GET TOTAL CREDIT BALANCE
async function creditBalance(id) {
  const sql = "SELECT total FROM bills WHERE type = ? AND userid = ?";
  const params = ["Cards", id];

  try {
    // ENSURE DATABASE BILLS IS INITIALIZED
    if (!DatabaseBills) {
      throw new Error(
        "Database bills is not initialized. Please check your setup."
      );
    }

    const resultSet = await DatabaseBills.executeQuery(sql, params);
    if (resultSet.rows.length > 0) {
      let creditBalance = 0;
      for (let i = 0; i < resultSet.rows.length; i++) {
        creditBalance += resultSet.rows.item(i).total;
      }
      return creditBalance;
    } else {
      console.log(0);
      return 0;
    }
  } catch (error) {
    console.error(
      "An error occurred while fetching bill data. Please try again.",
      error.message
    );
    throw error;
  }
}

// FUNCTION TO FETCH LOGGED USER ID
async function getLogUserId() {
  // RETRIVE USER'S ID
  const userid = sessionStorage.getItem("actualSession");
  if (userid) {
    console.log("User ID found: " + userid);
    return userid;
  } else {
    alert("There is no user logged in with ID");
    throw new Error("No logged-in user, can't find ID");
  }
}
