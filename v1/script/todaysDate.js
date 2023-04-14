module.exports.getTodaysDate = function () {

  let dateOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "long",
  };

  return new Date().toLocaleDateString("en-us", dateOptions);
};

module.exports.getTodaysDay = function () {
  
  const dayOptions = {
    weekday: "long",
  };

  return new Date().toLocaleDateString("en-US", dayOptions);
}
