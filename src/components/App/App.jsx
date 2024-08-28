import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import { ProtectedRoute } from "../../utils/auth";

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
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
  });

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

  //new fn for registration
  const handleRegistration = ({
    username,
    email,
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) {
      auth
        .register(username, password, email)
        .then(() => {
          // TODO: handle succesful registration
          setIsLoggedIn(true);
          closeActiveModal();
        })
        .catch((err) => console.error("Error setting data:", err));
    }
  };

  //new fn for login and logout
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // const Register = () => {
  //   const [data, setData] = useState({
  //     email: "",
  //     password: "",
  //     name: "",
  //     avatarUrl: "",
  //   });
  // moved to useState area and removed Register arrow fn

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  //from lesson

  // const handleRegister = (e) => {
  //   const { name, value } = e.target;
  //   setData(() => ({
  //     [name]: value,
  //   }));
  //   handleLogin();
  //   closeActiveModal();
  // };

  const handleUpdateUser = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setData((e) => {
      const { name, value } = e.target;
      ({ [name]: value });
    })
      .then(() => {
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => console.error("Error setting data:", err));
  });
}

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
  <div className="page">
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
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
                <Navigate to="/login" />
              )
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
      <RegisterModal
        activeModal={RegisterModal}
        onClose={closeActiveModal}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
      <LoginModal
        activeModal={LoginModal}
        onClose={closeActiveModal}
        onSubmit={handleSubmit}
      />
    </CurrentTemperatureUnitContext.Provider>
  </div>
);

export default App;
