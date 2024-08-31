import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData, currentUser }) {
  console.log("This is the current user", currentUser);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  // const { currentUser } = useContext(CurrentUserContext);
  const myAvatar = currentUser.avatar || currentUser.name.charAt(0);

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
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          {" "}
          + Add Clothes
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">{currentUser.name}</p>
            <img src={myAvatar} alt="avatar" className="header__avatar" />
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Header;
