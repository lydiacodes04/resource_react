import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

function Header({ handleAddClick, weatherData, userData }) {
  // console.log("This is the current user", userData);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const myAvatar = userData.avatar || userData.name.charAt(0);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="wtwr logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <div className="header__nav">
        {/* <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          {" "}
          + Add Clothes
        </button> */}
        <button type="button" className="header__sign-up">
          {/* {" "} */}
          Sign Up
        </button>

        <button type="button" className="header__log-in">
          {/* {" "} */}
          Log In
        </button>

        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">{userData.name}</p>
            <img src={myAvatar} alt="avatar" className="header__avatar" />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
