/* 

UPDATES
=============================
Consider adding features like 
    + Password Hashing 
    + Input Validation
    + Feedback for Database Operations.

Potential Improvements
=============================
1- Database Versioning:
    Add support for database versioning to handle 
    schema changes in future updates.

2- Error Handling:
    Enhance error handling to provide more detailed 
    error messages or error codes.

3- Database Closing:
    Add a method to close the database connection 
    when it's no longer needed.

4- Validation:
    Validate the data being inserted or updated 
    to ensure it conforms to the expected format.

5- Indexes:
    Add indexes to frequently queried columns 
    (e.g., userid, date) to improve performance.

6- Modularization:
    Split the code into smaller modules or classes 
    for better maintainability 
    (e.g., separate modules for initialization, 
    query execution, and table management).



TOAST MESSAGES
=========================
import { showToast } from "./toast.js";

// Example: Show a success toast
showToast("Operation completed successfully!", "success");

// Example: Show an error toast
showToast("Something went wrong. Please try again.", "error");

// Example: Show an info toast
showToast("This is an informational message.", "info");

// Example: Show a warning toast
showToast("This action cannot be undone.", "warning");


*/
