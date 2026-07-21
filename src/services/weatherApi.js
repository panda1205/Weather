import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeather = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getForecast = async (city) => {
  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};