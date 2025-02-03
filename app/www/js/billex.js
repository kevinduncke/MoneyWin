// Wait for `deviceready` before using Cordova's device APIs.
document.addEventListener("deviceready", onDeviceReady, false);

async function onDeviceReady() {
  console.log("Device is ready.");
  try {
    await DatabaseBills.init();
    console.log("Bills database is ready.");
  } catch (error) {
    console.error("Failed to initialize database: ", error);
    alert("Failed to initialize the database. Please restart the app.");
  }
}
