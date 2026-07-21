function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  // 👉 group by date (clean daily forecast)
  const dailyData = {};

  forecast.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];

    if (!dailyData[date]) {
      dailyData[date] = item;
    }
  });

  const dailyArray = Object.values(dailyData).slice(0, 5);

  return (
    <div className="forecast">
      <h3>📅 5-Day Forecast</h3>

      <div className="forecast-list">
        {dailyArray.map((item, index) => (
          <div className="weather-card" key={index}>
            <h4>{item.dt_txt.split(" ")[0]}</h4>

            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="weather icon"
            />

            <p>{Math.round(item.main.temp)}°C</p>

            <small>{item.weather[0].main}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;