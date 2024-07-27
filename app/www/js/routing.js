"use strict";

export function newRoute(data) {
  setTimeout(() => {
    location.replace(data);
  }, 3000);
}
