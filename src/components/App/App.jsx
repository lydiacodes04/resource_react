import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { signUp, signIn, verifyUser, updateProfile } from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute";
import {
  getItems,
  postItems,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";

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
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("jwt") ? true : false
  );
  const [currentUser, setCurrentUser] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.state?.showLogin) {
      setActiveModal("login-modal");
      navigate("/", { state: {}, replace: true });
    }
  }, [location]);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleEditModal = () => {
    setActiveModal("edit-profile");
  };

  const handleAddRegistration = () => {
    setActiveModal("registration-modal");
  };

  const handleShowLogin = () => {
    setActiveModal("login-modal");
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

  const handleRegistration = ({ email, password, name, avatarUrl }) => {
    signUp(email, password, name, avatarUrl)
      .then(() => {
        setCurrentUser({ email, password });
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => console.error("Error setting data:", err));
  };

  const submitEditProfile = ({ name, avatarUrl }) => {
    updateProfile(name, avatarUrl)
      .then((data) => {
        setCurrentUser(data);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => console.error("Error setting data:", err));
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    signIn(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return verifyUser(data.token);
        }
        return navigate("/");
      })
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => console.log("A login error has occurred", err));
  };

  const handleCardLike = (_id, isLiked) => {
    const token = localStorage.getItem("jwt");
    if (!isLiked) {
      addCardLike(_id)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      removeCardLike(_id)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser({ email: "", password: "" });
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");
      verifyUser(token)
        .then((data) => {
          setIsLoggedIn(true);
          setCurrentUser(data);
        })
        .catch((err) => console.error("Error logging in:", err));
    }
  }, []);

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
              handleAddRegistration={handleAddRegistration}
              handleShowLogin={handleShowLogin}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
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
                      handleSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                      handleEditModal={handleEditModal}
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
                    <Navigate to="/" state={{ showLogin: true }} replace />
                  )
                }
              />
            </Routes>

            <Footer />
          </div>
          <RegisterModal
            isOpen={activeModal === "registration-modal"}
            onClose={closeActiveModal}
            onSubmit={handleRegistration}
            handleShowLogin={handleShowLogin}
          />
          <LoginModal
            isOpen={activeModal === "login-modal"}
            onClose={closeActiveModal}
            onSubmit={handleLogin}
            handleAddRegistration={handleAddRegistration}
          />
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
            activeModal={activeModal}
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onSubmit={submitEditProfile}
          ></EditProfileModal>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

//committed to commits 4/13
