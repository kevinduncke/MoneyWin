export function calendar() {
  const date = new Date();
  let currentDate = {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    stringMonth: ''
  };

  switch (currentDate.month) {
    case 0:
      currentDate.month = 1;
      currentDate.stringMonth = "January";
      break;
    case 1:
      currentDate.month = 2;
      currentDate.stringMonth = "February";
      break;
    case 2:
      currentDate.month = 3;
      currentDate.stringMonth = "March";
      break;
    case 3:
      currentDate.stringMonth = "April";
      currentDate.month = 4;
      break;
    case 4:
      currentDate.stringMonth = "May";
      currentDate.month = 5;
      break;
    case 5:
      currentDate.stringMonth = "June";
      currentDate.month = 6;
      break;
    case 6:
      currentDate.stringMonth = "July";
      currentDate.month = 7;
      break;
    case 7:
      currentDate.stringMonth = "August";
      currentDate.month = 8;
      break;
    case 8:
      currentDate.stringMonth = "September";
      currentDate.month = 9;
      break;
    case 9:
      currentDate.stringMonth = "October";
      currentDate.month = 10;
      break;
    case 10:
      currentDate.stringMonth = "November";
      currentDate.month = 11;
      break;
    case 11:
      currentDate.stringMonth = "December";
      currentDate.month = 12;
      break;
  }

  return currentDate;
}

export function time() {
  const date = new Date();
  let clock = {
    hour: date.getHours(),
    minutes: date.getMinutes(),
    id: "AM",
  };

  if (clock.hour <= 9) {
    clock.hour = "0" + clock.hour;
  }
  if (clock.minutes <= 9) {
    clock.minutes = "0" + clock.minutes;
  }
  if (clock.hour >= 12) {
    clock.id = "PM";
  }

  return clock;
}

export function balance(){
  const userKey = localStorage.getItem(`LOGGED_USER`);
  const salary = `${localStorage.getItem(`${userKey}-SALARY`)}`;
  const bills = `${localStorage.getItem(`${userKey}-BILLS`)}`;

  return salary - bills;
}

export function bills(value){
  const userKey = localStorage.getItem(`LOGGED-USER`);
  let bills = localStorage.getItem(`${userKey}-BILLS`);
  bills = bills + value;
  localStorage.setItem(`${userKey}-BILLS`, bills);
}

export function currency(){
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter;
}