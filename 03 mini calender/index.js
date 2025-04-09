const monthName = document.getElementById("monthName");
const dayName = document.getElementById("dayName");
const dayNum = document.getElementById("dayNumber");
const year = document.getElementById("year");

const date = new Date();

const month = date.getMonth()

monthName.innerText=date.toLocaleString("en",{month:"long"})
dayName.innerText=date.toLocaleString("en",{weekday:"long"})
dayNum.innerText=date.getDate();
year.innerText=date.getFullYear();