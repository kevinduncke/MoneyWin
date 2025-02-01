document.addEventListener(
  "deviceready",
  () => {
    // CACHE DOM ELEMENTS
    const description = setElementsDOM("hn-description");
    const billValue = setElementsDOM("hn-value");
    const payment = setElementsDOM("hn-payment");
    const type = setElementsDOM("hn-typeBill");
    const date = setElementsDOM("hn-date");
    const quantity = setElementsDOM("hn-quant-value");
    const total = setElementsDOM("hn-total");
    const currency = setElementsDOM("hn-currency");
    const saveBillBtn = setElementsDOM("g-hnb-cmd-s");
    const cancelBill = setElementsDOM("g-hnb-cmd-c");

    // EVENT LISTENER FOR SAVE BUTTON
    saveBillBtn.addEventListener("click", () => {
      try {
        const newBill = {
          description: description.value.trim(),
          value: parseFloat(billValue.value),
          payment: payment.value,
          type: type.value,
          date: date.value,
          quantity: parseFloat(quantity.value),
          total: parseFloat(total.value.trim()),
          currency: currency.value,
        };

        // RETRIVE USER'S ID || OK
        const userID = sessionStorage.getItem("actualSession");
        if (userID) {
          newBill.user_id = userID;
        } else {
          alert("No user is currently logged in.");
          return;
        }

        // DATA VALIDATION
        if (!newBill.description) {
          alert("Please enter a description.");
          return;
        }
        if (!newBill.value || isNaN(newBill.value)) {
          alert("Please enter a valid value.");
          return;
        }
        if (!newBill.payment) {
          alert("Please, select a payment method.");
          return;
        }
        if (!newBill.type) {
          alert("Please, select a bill type.");
          return;
        }
        if (!newBill.date) {
          alert("Please, select a date.");
          return;
        }
        if (!newBill.quantity || isNaN(!newBill.quantity)) {
          alert("Please, enter a valid quantity.");
          return;
        }
        if (!newBill.total || isNaN(!newBill.total)) {
          alert("Please, enter a valid total amount.");
          return;
        }
        if (!newBill.currency) {
          alert("Please, select a currency.");
          return;
        }

        // SAVE BILL DATA
        saveBillData(newBill);
      } catch (error) {
        console.error("Error saving bill: ", error);
        alert("An error occurred while saving the bill. Please try again.");
      }
    });
  },
  false
);

// HELPER FUNCTION TO GET DOM ELEMENTS
function setElementsDOM(id) {
  return document.getElementById(id);
}

// FUNCTION TO SAVE A BILL IN DATABASE
async function saveBillData(item) {
  const sql = `INSERT INTO bills (description, value, payment, type, date, quantity, total, currency, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  const params = [
    item.description,
    item.value,
    item.payment,
    item.type,
    item.date,
    item.quantity,
    item.total,
    item.currency,
    item.user_id,
  ];

  // Ensure DatabaseModule is initialized
  if (!DatabaseModule) {
    alert("Database module is not initialized.");
    throw new Error("Database module is not initialized.");
  }

  try {
    const resultSet = await DatabaseModule.executeQuery(sql, params);

    if (resultSet.rowsAffected > 0) {
      console.log("Bill saved successfully in database");
      alert("Bill saved successfully in database");
    } else {
      console.error("Cannot save in database");
      alert("Failed to save the bill. Please try again.");
    }
  } catch (error) {
    console.error("Error inserting data into database: ", error);
    alert("Error inserting data into database: " + error.message);
    throw new Error("Cannot INSERT data in database.");
  }
}
