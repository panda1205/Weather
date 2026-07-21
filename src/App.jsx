import { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import Loader from "./components/Loader";
import Error from "./components/Error";

import { getWeather, getForecast } from "./services/weatherApi";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [cities] = useState(["Pune", "Mumbai", "Delhi", "London"]);

  // 🌙 Dark mode
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  // ⭐ Load favorites
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites"));
    if (saved) setFavorites(saved);
  }, []);

  // 🔍 Search weather
  const searchWeather = async (city) => {
    setLoading(true);
    setError("");

    const weatherData = await getWeather(city);
    const forecastData = await getForecast(city);

    if (weatherData && forecastData) {
      setWeather(weatherData);
      setForecast(forecastData.list);
    } else {
      setError("City not found!");
    }

    setLoading(false);
  };

  // 📍 Location weather
  const getCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

      const res = await fetch(url);
      const data = await res.json();

      if (data) {
        setWeather(data);
      }
    });
  };

  // ❤️ Add favorite
  const addFavorite = () => {
    if (weather && !favorites.includes(weather.name)) {
      const updated = [...favorites, weather.name];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
    }
  };

  // ❌ Remove favorite
  const removeFavorite = (city) => {
    const updated = favorites.filter((c) => c !== city);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="app">

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <div className="weather-container">

        {/* Search */}
        <SearchBar searchWeather={searchWeather} />

        {/* Quick cities */}
        <div className="city-grid">
          {cities.map((city) => (
            <button key={city} onClick={() => searchWeather(city)}>
              {city}
            </button>
          ))}
        </div>

        {/* Location */}
        <button onClick={getCurrentLocationWeather}>
          📍 My Location
        </button>

        {/* Error */}
        <Error message={error} />

        {/* Loader / Weather */}
        {loading ? (
          <Loader />
        ) : weather ? (
          <>
            <CurrentWeather weather={weather} />

            <button className="fav-btn" onClick={addFavorite}>
              ❤️ Add to Favorites
            </button>
          </>
        ) : (
          <h2 style={{ textAlign: "center" }}>
            🔍 Search a city...
          </h2>
        )}

        {/* Forecast */}
        <Forecast forecast={forecast} />

        {/* Favorites */}
        {favorites.length > 0 && (
          <div className="favorites">
            <h3>⭐ Favorite Cities</h3>

            {favorites.map((city, index) => (
              <div key={index} className="fav-item">
                <span onClick={() => searchWeather(city)}>
                  📍 {city}
                </span>

                <button onClick={() => removeFavorite(city)}>
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;