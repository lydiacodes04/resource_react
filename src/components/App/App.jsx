import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import { getItems, postItems, deleteItem } from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { signUp, signIn, verifyUser } from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../../utils/ProtectedRoute";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userData, setUserData] = useState({
  //   password: "",
  //   email: "",
  //   name: "",
  //   avatarUrl: "",
  // });
  const [currentUser, setCurrentUser] = useState({ email: "", password: "" });

  const userData = {
    password: "",
    email: "",
    name: "",
    avatarUrl: "",
  };

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddItemSubmit = (item) => {
    postItems(item.name, item.imageUrl, item.weather)
      .then((newCard) => {
        setClothingItems([newCard, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.error("Error submitting:", err));
  };

  const handleDeleteItem = (item) => {
    deleteItem(item)
      .then((res) => {
        const newClothingItems = clothingItems.filter(
          (cardItem) => cardItem._id !== item._id
        );
        setClothingItems(newClothingItems);
        closeActiveModal();
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  //new fns
  const Register = () => {
    const [userData, setUserData] = useState({
      email: "me@gmail.com",
      password: "mypassword",
      name: "my name",
      avatarUrl:
        "https://images.unsplash.com/photo-1628015081036-0747ec8f077a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    })
      .then((userData) => {
        signUp(userData);
        setUserData(userData);
        setCurrentUser(userData);
      })
      .catch((err) => console.log("An error occurred", err));
  };

  const handleRegistration = ({ email, password, name, avatarUrl }) => {
    auth
      .signUp()
      .then(() => {
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => console.error("Error setting data:", err));
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const Login = ({ handleLogin }) => {
    const [currentUser, setCurrentUser] = useState({
      email: "",
      password: "",
    })
      .then(() => {
        signIn(currentUser);
        setCurrentUser(currentUser);
      })
      .catch((err) => console.log("A login error has occurred", err));
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .verifyUser(email, password)
      .signIn()
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("jwt", res.token);
          console.log(data);
          setUserData(data.user);
          setIsLoggedIn(true);
          closeActiveModal();
          navigate("/profile");
        }
      })
      .catch((err) => console.error("Error logging in:", err));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // const handleUpdateUser = (e) => {
  //   const { name, value } = e.target;
  //   setData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  useEffect(() => {
    verifyUser((data) => {
      if (data.jwt) {
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/profile");
      }
    })
      .then(() => {})
      .catch((err) => console.error("Error logging in:", err));
  });

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => console.error("Error getting weather:", err));
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => console.error("Error getting items:", err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              currentUser={currentUser}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Navigate to="/signIn" />
                  )
                }
              />
              <Route
                path="/register"
                element={
                  <div className="registerContainer">
                    <Register handleRegistration={handleRegistration} />
                  </div>
                }
              />
              <Route
                path="/login"
                element={
                  <div className="loginContainer">
                    <Login handleLogin={handleLogin} />
                  </div>
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            card={selectedCard}
            handleDeleteItem={handleDeleteItem}
          />
          <EditProfileModal
            activeModal={EditProfileModal}
            onClose={closeActiveModal}
            onAddItem={handleAddItemSubmit}
          ></EditProfileModal>
          <RegisterModal
            activeModal={RegisterModal}
            onClose={closeActiveModal}
            onSubmit={handleRegistrationSubmit}
          />
          <LoginModal
            activeModal={LoginModal}
            onClose={closeActiveModal}
            onSubmit={handleLoginSubmit}
            onChange={handleChange}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
