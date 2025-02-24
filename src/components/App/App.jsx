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
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { signUp, signIn, verifyUser, updateProfile } from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../../utils/ProtectedRoute";
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
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
  });

  // console.log("is logged in", isLoggedIn);

  const navigate = useNavigate();

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

  // const Register = ({ handleRegistration }) => {
  //   const [userData, setUserData] = useState({
  //     email: "",
  //     password: "",
  //     name: "",
  //     avatarUrl: "",
  //   });
  // };

  const handleRegistration = ({ email, password, name, avatarUrl }) => {
    signUp(email, password, name, avatarUrl)
      .then(() => {
        setUserData({ email, password, name, avatarUrl });
        setCurrentUser({ email, password, name, avatarUrl });

        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => console.error("Error setting data:", err));
  };

  const submitEditProfile = ({ name, avatarUrl }) => {
    setUserData({ name, avatarUrl })
      .then(() => {
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
        // console.log(data);
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return verifyUser(data.token);
        }
        return <Navigate to="/login" replace />;
      })
      .then((data) => {
        // console.log(data);
        // setUserData(data);
        // signIn(currentUser);
        setCurrentUser(data);
        setIsLoggedIn(true);
        closeActiveModal();
        navigate("/profile");
      })
      .catch((err) => console.log("A login error has occurred", err));
  };

  const handleCardLike = (_id, isLiked) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    if (!isLiked) {
      // ? api
      addCardLike(_id)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    } else {
      // if not, send a request to remove the user's id from the card's likes array
      // api
      removeCardLike(_id)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === _id ? updatedCard : item))
          );
        })
        .catch((err) => console.log(err));
    }
  };

  //     localStorage.removeItem(res.token);
  //       return <Navigate to="/login" replace />;
  //     })
  //     .then((data) => {
  //       console.log("this is the data", data);
  //       // setUserData(data);
  //       // signIn(currentUser);
  //       // setCurrentUser(currentUser);
  //       setIsLoggedIn(true);
  //       e.preventDefault();
  //       closeActiveModal();
  //       navigate("/profile");
  //     })
  //     .catch((err) => console.log("A login error has occurred", err));
  // };

  /*
  const handleSignOut = (({ id, token }) => {
    localStorage.removeItem(token);
  })
    .then(() => {
      setIsLoggedIn(false);
      setCurrentUser({ email: "", password: "" });
      navigate("/");
    })
    .catch((err) => console.error("Error logging in:", err));
  */
  const handleSignOut = () => {
    localStorage.removeItem("jwt");

    setIsLoggedIn(false);
    setCurrentUser({ email: "", password: "" });
    navigate("/");
  };

  // useEffect(() => {
  //   verifyUser(({ token }) => {
  //     if (data.jwt) {
  //       setIsLoggedIn(true);
  //       closeActiveModal();
  //       navigate("/profile");
  //     }
  //   })
  //     .then(() => {})
  //     .catch((err) => console.error("Error logging in:", err));
  // });

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      // handle signin logic when you refresh browser
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

  // useEffect(() => {
  //   updateProfile(name, avatar)
  //     .then((data) => {
  //       setUserData(data);
  //     })
  //     .catch((err) => console.error("Error updating profile:", err));
  // }, []);

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
              userData={userData}
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
                      handleSignOut={handleSignOut}
                      onCardLike={handleCardLike}
                      handleEditModal={handleEditModal}
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
            userData={userData}
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

//sample User
// email: "me@gmail.com",
// password: "mypassword",
// name: "my name"
// avatarUrl: "https://images.unsplash.com/photo-1628015081036-0747ec8f077a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
