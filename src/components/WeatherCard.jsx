function WeatherCard({ day, temp }) {
  return (
    <div className="weather-card">
      <h4>{day}</h4>
      <p>☀️</p>
      <p>{temp}</p>
    </div>
  );
}

export default WeatherCard;