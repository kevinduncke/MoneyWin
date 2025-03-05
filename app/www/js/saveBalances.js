"use strict";

// FUNCTION TO SET BASE SALARY AND BILL BALANCES
export async function setSalaryBalance(salary){
  const sql = "INSERT INTO balances (salaryBalance, billsBalance) VALUES (?, ?)";
  const params = [salary, 0];

  try {
    // ENSURE DATABASE BALANCES IS INITIALIZED
    if (!DatabaseBalances) {
      throw new Error(
        "Database balances is not initialized. Please check your setup."
      );
    }

    await DatabaseBalances.executeQuery(sql, params);
    console.log("Salary and bills balance set successfully.");
  } catch (error) {
    console.error(
      "An error occurred while setting salary and bills balance. Please try again.",
      error.message
    );
    throw error;
  }
}

// FUNCTION TO UPDATE BASE SALARY AND BILL BALANCES
export async function updateBalances(userID, salary, bills){
  console.log(userID);

  const sql = "UPDATE balances SET salaryBalance = ?, billsBalance = ? WHERE id = ?";
  const params = [salary, bills, userID];

  try {
    // ENSURE DATABASE BALANCES IS INITIALIZED
    if (!DatabaseBalances){
      throw new Error(
        "Database balances is not initialized. Please check your setup."
      );
    }

    await DatabaseBalances.executeQuery(sql, params);
    console.log("Salary and bill balance updated successfully.");
  } catch (error) {
    console.error(
      "An error occurred while updating salary and bill balance. Please try again.",
      error.message
    );
    throw error;
  }
}

// FUNCTION TO FETCH BALANCE DATA FROM DATABASE
export async function getSalaryBalance(userID){
  console.log(userID);

  const sql = "SELECT * FROM balances WHERE id = ?";
  const params = [userID];

  try {
    // ENSURE DATABASE BALANCES IS INITIALIZED
    if (!DatabaseBalances){
      throw new Error(
        "Database balances is not initialized. Please check your setup."
      );
    }

    const resultSet = await DatabaseBalances.executeQuery(sql, params);
    if (resultSet.rows.length > 0){
      return resultSet.rows.item(0);
    } else {
      throw new Error("No balance found for the logged-in user.");
    }
  } catch (error) {
    console.error(
      "An error occurred while fetching balance data. Please try again.",
      error.message
    );
  }
}