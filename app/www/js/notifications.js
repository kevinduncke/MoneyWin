"use strict";

// FUNCTION TO SHOW TOAST NOTIFICATION
export function showNotification(message, type = "info"){
  const notification = document.createElement("div");
  notification.className = `toast-notification ${type}`;
  notification.textContent = message;

  // APPEND THE NOTIFICATION TO THE CONTAINER
  const toastContainer = document.getElementById("toast-container");
  if(toastContainer){
    toastContainer.appendChild(notification);

    // AUTOMATICALLY REMOVE
    setTimeout(() => {
      notification.remove();
    }, 5000);
  } else {
    console.error("Toast Notification Container Element DOM not found.");
  }
}