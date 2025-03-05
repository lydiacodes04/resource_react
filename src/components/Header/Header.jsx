import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
function Header({
  handleAddClick,
  weatherData,
  handleAddRegistration,
  handleShowLogin,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const { avatar, name } = useContext(CurrentUserContext);

  const myAvatar = avatar || name;

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="wtwr logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__controls">
        <ToggleSwitch />
        <div className="header__nav">
          {!myAvatar ? (
            <>
              <button
                type="button"
                className="header__sign-up"
                onClick={handleAddRegistration}
              >
                Sign Up
              </button>

              <button
                type="button"
                className="header__log-in"
                onClick={handleShowLogin}
              >
                Log In
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleAddClick}
                type="button"
                className="header__add-clothes-btn"
              >
                {" "}
                + Add Clothes
              </button>

              <Link to="/profile" className="header__link">
                <p className="header__username">{name} </p>
                <img className="header__avatar" src={myAvatar} alt="avatar" />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
