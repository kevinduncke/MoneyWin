"use strict";

document.addEventListener(
  "deviceready",
  async () => {
    try {
      console.log("Running OK -------->");
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
  console.log("FUNCTION RUNNING OK ------------------------------>");
  try {
    const userID = await getLogUserId();
    const totalBalance = await billsBalance(userID);

    // DISPLAY THE TOTAL BALANCE
    const billsTotal = document.getElementById("bvi-bills");
    if (billsTotal) {
      billsTotal.textContent = totalBalance.toFixed(2);
    } else {
      console.error("Bill Total element not found in the DOM.");
    }
  } catch (error) {
    console.error("Failed to fetch accoun balance:", error.message);
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
      console.log(totalBalance);
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