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
  const { avatar, email, name } = useContext(CurrentUserContext);
  // console.log(currentUser);
  // console.log({
  //   handleAddClick,
  //   weatherData,
  //   handleAddRegistration,
  //   handleShowLogin,
  // });
  const myAvatar = avatar || name.charAt(0);

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

        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">{name}</p>
            <img src={avatar} alt="avatar" className="header__avatar" />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
