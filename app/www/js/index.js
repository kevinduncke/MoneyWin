// Wait for `deviceready` before using Cordova's device APIs.
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  console.log("Device is ready.");
}

// Import routes module
import { newRoute } from "./routing.js";

// Check if user is remembered and redirect on window load
window.onload = function () {
  const loggedUserCheck = localStorage.getItem("REMB_USER");

  // Redirect to home page if a remembered user is found
  if (loggedUserCheck) {
    newRoute("./pages/home.html");
  }
}
