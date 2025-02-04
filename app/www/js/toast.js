"use strict";

// TOAST NOTIFICATION
const TOAST_DURATION = 3000; // 3 Seconds
const TOAST_POSITION = "bottom-right"; // top||bottom

// TOAST CONTAINER
let toastContainer;

// INITIALIZE THE TOAST CONTAINER
function initToast() {
  toastContainer = document.createElement("div");
  toastContainer.id = "toast-container";
  toastContainer.setAttribute("aria-live", "polite");
  toastContainer.setAttribute("aria-atomic", "true");
  document.body.appendChild(toastContainer);

  // APPLY STYLES BASED ON POSITION
  applyToastStyles(TOAST_POSITION);
}

// APPLY STYLES TO THE TOAST CONTAINER
function applyToastStyles(position) {
  const styles = {
    position: "fixed",
    zIndex: 1000,
    padding: "10px",
  };

  switch (position) {
    case "top-right":
      styles.top = "20px";
      styles.right = "20px";
      break;

    case "top-left":
      styles.top = "20px";
      styles.left = "20px";
      break;

    case "bottom-left":
      styles.bottom = "20px";
      styles.left = "20px";
      break;

    default:
      styles.bottom = "20px";
      styles.right = "20px";
      break;
  }

  Object.assign(toastContainer.style, styles);
}

// SHOW A TOAST NOTIFICATION
function showToast(message, type = "info") {
  if (!toastContainer) {
    initToast();
  }

  // CREATE THE TOAST ELEMENT
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  // ADD THE TOAST TO THE CONTAINER
  toastContainer.appendChild(toast);

  // REMOVE THE TOAST AFTER THE SPECIFIED DURATION
  setTimeout(() => {
    toast.remove();
  }, TOAST_DURATION);
}

// EXPORT THE SHOW TOAST FUNCTION
export { showToast };
