import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  console.log("Toggle");
  return (
    <label className="switch">
      <input type="checkbox" className="switch__box" />
    </label>
  );
};
export default ToggleSwitch;
