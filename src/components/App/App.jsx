import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import {
  getItems,
  addItem,
  removeItem,
  addCardLike,
  removeCardLike,
  updateProfile,
} from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import { register, authorize, checkToken } from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/" />;
};

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    console.log("Selected card:", card);
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleRegistration = (inputValues) => {
    register(inputValues)
      .then(() => {
        return authorize({
          email: inputValues.email,
          password: inputValues.password,
        });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        return checkToken(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        console.log("User registered and logged in:", userData);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogin = (inputValues) => {
    if (!inputValues.email || !inputValues.password) {
      return;
    }
    authorize(inputValues)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        navigate("/");
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleEditProfile = (inputValues) => {
    const token = localStorage.getItem("jwt");
    updateProfile(inputValues, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/", { replace: true });
  };

  const handleAddItem = (item) => {
    console.log("Item being sent to API:", item);
    const token = localStorage.getItem("jwt");
    addItem(item, token)
      .then((newItem) => {
        setClothingItems([newItem.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    removeItem(id, token)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== id));
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            console.log("API response:", updatedCard);
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item)),
            );
            if (selectedCard._id === id) {
              setSelectedCard(updatedCard.data);
            }
            console.log("Item liked successfully");
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            console.log("API response:", updatedCard);
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item)),
            );
            if (selectedCard._id === id) {
              setSelectedCard(updatedCard.data);
            }
            console.log("Item unliked successfully");
          })
          .catch((err) => console.log(err));
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        const validItems = (data.data || data).filter(
          (item) =>
            item.imageUrl &&
            item.imageUrl !== "fake.png" &&
            !item.imageUrl.includes("fake.png") &&
            (item.imageUrl.startsWith("http://") ||
              item.imageUrl.startsWith("https://")),
        );
        const sortedData = validItems.sort((a, b) => b._id - a._id);
        setClothingItems(sortedData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((error) => {
          localStorage.removeItem("jwt");
          console.error("Invalid token:", error);
        });
    }
  }, []);

  console.log("App component rendered");

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              onRegisterClick={handleRegisterClick}
              onLoginClick={() => setActiveModal("login")}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
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
                      clothingItems={clothingItems.filter(
                        (item) => item.owner === currentUser?._id,
                      )}
                      handleAddClick={handleAddClick}
                      onCardLike={handleCardLike}
                      onSignOut={handleSignOut}
                      onUpdateUser={handleEditProfile}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              onRegister={handleRegistration}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleLogin}
              onSwitchToRegister={handleRegisterClick}
            />

            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItem={handleAddItem}
          />
          <ItemModal
            key={selectedCard._id}
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteItem={() => onDeleteItem(selectedCard._id)}
            onCardLike={handleCardLike}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
