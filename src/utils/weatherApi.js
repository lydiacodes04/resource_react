//weather API

const getWeather = ({ latitude, longitude }, APIkey) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  );
};

// if (temperature >= 86) {
//   return "hot";
// } else if (temperature >= 66) {
//   return "warm";
// } else {
//   return "cold";
// }
