// FUNCTION TO ENABLE INPUT FIELDS FOR EDITING USER DATA
function editData(id) {
  // CALL AND PASS THE ID PARAMETER
  const elements = getElements(id);

  if(elements){
    elements.input.disabled = false;
    elements.editBtn.style.display = "none";
    elements.saveBtn.style.display = "block";
  } else {
    console.error("Invalid ID");
  }
}


// FUNCTION TO SAVE EDITED USER DATA
function saveData(id) {
  const userKey = localStorage.getItem("LOGGED_USER");
  const elements = getElements(id);

  if(elements){
    elements.input.disabled = true;
    elements.editBtn.style.display = "block";
    elements.saveBtn.style.display = "none";

    const newValue = elements.input.value;
    localStorage.setItem(`${userKey}-${id.toUpperCase()}`, newValue);
  } else {
    console.error("Invalid ID");
  }
}

// HELPER FUNCTION TO RETURN ELEMENTS BASED ON ID
function getElements(id){
  switch (id){
    case "fullname":
      return {
        input: document.getElementById("account-name"),
        editBtn: document.getElementById("fllnm-edit-btn"),
        saveBtn: document.getElementById("fllnm-save-btn")
      };
    case "password":
      return {
        input: document.getElementById("account-password"),
        editBtn: document.getElementById("password-edit-btn"),
        saveBtn: document.getElementById("password-save-btn")
      };
    case "salary":
      return {
        input: document.getElementById("account-salary"),
        editBtn: document.getElementById("salary-edit-btn"),
        saveBtn: document.getElementById("salary-save-btn")
      };
    default:
      return null;
  }
}