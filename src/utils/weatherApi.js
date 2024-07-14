export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;

  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };

  result.typeF = getWeatherTypeF(result.temp.F);
  result.typeC = getWeatherTypeC(result.temp.C);

  return result;
};

// weather.temperature.F = data.main.temp);
// weather.temperature.C = Math.round((data.main.temp - 32) * 5/9)};

// const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
// console.log(currentTemperatureUnit);

const getWeatherTypeF = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};

const getWeatherTypeC = (temperature) => {
  if (temperature > 30) {
    return "hot";
  } else if (temperature >= 19 && temperature < 30) {
    return "warm";
  } else {
    return "cold";
  }
};
