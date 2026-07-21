function CurrentWeather({ weather }) {
  const icon = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="current-weather">
      <h2>📍 {weather.name}, {weather.sys.country}</h2>

      <img src={iconUrl} alt="Weather Icon" />

      <h1>{Math.round(weather.main.temp)}°C</h1>

      <p>{weather.weather[0].description}</p>

      <div className="weather-info">
        <p>💧 Humidity: {weather.main.humidity}%</p>
        <p>💨 Wind: {weather.wind.speed} m/s</p>
        <p>🌡️ Feels Like: {Math.round(weather.main.feels_like)}°C</p>
      </div>
    </div>
  );
}

export default CurrentWeather;