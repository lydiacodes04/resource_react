// Header.jsx
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} />
      <p className="header__date-and-location">DATE, LOCATION</p>
      <button className="header__add-clothes-btn">+ Add Clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

// Logo
// <reactLogo />
// Generate current date using JS
// const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
// Current location
//addClothes btn that opens ModalWithForm
//user's name and avatars

export default Header;
