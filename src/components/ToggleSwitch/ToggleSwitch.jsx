import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  const [CurrentTemperatureUnit, handleToggleSwitchChange] =
    React.useState("C");
  const handleChange = (e) => {
    if (CurrentTemperatureUnit === "C") handleToggleSwitchChange("F");
    if (CurrentTemperatureUnit === "F") handleToggleSwitchChange("C");
  };
  console.log(CurrentTemperatureUnit);

  return (
    <label className="switch">
      <input type="checkbox" className="switch__box" onChange={handleChange} />
      <span
        className={
          CurrentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>

      <p
        className={`switch__temp-F ${
          CurrentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-C ${
          CurrentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};
export default ToggleSwitch;
