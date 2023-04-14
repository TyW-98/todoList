module.exports = getTodaysDate

function getTodaysDate() {
  const dateOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "long",
  };

  const fullDate = new Date().toLocaleDateString("en-us", dateOptions);

  return fullDate
}