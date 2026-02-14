import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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
import { getItems } from "../../utils/api";
import { addItem, deleteItem } from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import { register, authorize, checkToken } from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";

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

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
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
      .then((data) => {
        // After successful registration, sign the user in
        return authorize({
          email: inputValues.email,
          password: inputValues.password,
        });
      })
      .then((data) => {
        // Handle successful login here (you'll expand this later)
        localStorage.setItem("jwt", data.token);
        console.log("User registered and logged in:", data);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogin = (inputValues) => {
    authorize(inputValues)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        console.log("User logged in:", data);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      _id: Date.now(),
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };

    const token = localStorage.getItem("jwt");
    addItem(newCardData, token)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onDeleteItem = (id) => {
    const token = localStorage.getItem("jwt");
    deleteItem(id, token)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== id));
        closeActiveModal();
      })
      .catch(console.error);
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
        const sortedData = data.sort((a, b) => b._id - a._id);
        setClothingItems(sortedData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          // Handle valid token - you'll use this data later
          console.log("Valid token, user data:", userData);
        })
        .catch((error) => {
          // Token is invalid, remove it
          localStorage.removeItem("jwt");
          console.error("Invalid token:", error);
        });
    }
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            onRegisterClick={handleRegisterClick}
            onLoginClick={() => setActiveModal("login")}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
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
          />

          <Footer />
        </div>

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItem={onAddItem}
        />
        <ItemModal
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={closeActiveModal}
          onDeleteItem={onDeleteItem}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
