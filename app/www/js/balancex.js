"use strict";

// Wait for `deviceready` before using Cordova's device APIs.
document.addEventListener("deviceready", onDeviceReady, false);

async function onDeviceReady() {
  console.log("Device is ready.");
  try {
    await DatabaseBalances.init();
    console.log("Balances database is ready.");
  } catch (error) {
    console.error("Failed to initialize database: ", error);
  }
}
