import { Link } from "react-router-dom";
import "./Header.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Header({ handleAddClick, handleAddRegistration, handleShowLogin }) {
  const { avatar, name } = useContext(CurrentUserContext);

  const myAvatar = avatar || name;

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <p className="header__logo-text">ResourceFinder</p>
      </Link>

      <div className="header__controls">
        <div className="header__nav">
          <Link to="/about" className="header__about">
            <p className="header__about-text">About</p>
          </Link>
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
