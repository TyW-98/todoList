exports.getTodaysDate = function () {

  const dateOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "long",
  };

  return new Date().toLocaleDateString("en-us", dateOptions);
};

exports.getTodaysDay = function () {

  const dayOptions = {
    weekday: "long",
  };

  return new Date().toLocaleDateString("en-US", dayOptions);
}
