export function calendar() {
  const date = new Date();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    stringMonth: months[date.getMonth()]
  };
}

export function time() {
  const date = new Date();
  let hour = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const id = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;

  return {
    hour: hour.toString().padStart(2, "0"),
    minutes,
    id
  };
}

export function balance() {
  const userKey = localStorage.getItem(`LOGGED_USER`);
  const salary = Number(localStorage.getItem(`${userKey}-SALARY`) || 0);
  const bills = Number(localStorage.getItem(`${userKey}-BILLS`) || 0);

  return salary - bills;
}

export function getLocalStorage(key) {
  return localStorage.getItem(key);
}

export function bills(value) {
  const userKey = getLocalStorage("LOGGED_USER");
  let userBills = Number(getLocalStorage(`${userKey}-BILLS`) || 0);
  userBills += Number(value);
  localStorage.setItem(`${userKey}-BILLS`, userBills.toString());
}

export function currency() {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter;
}

