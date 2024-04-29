import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  weather: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    fetchWeatherStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess(state, action) {
      state.weather = action.payload;
      state.loading = false;
    },
    fetchWeatherFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } =
  weatherSlice.actions;

export const fetchWeatherData = (query) => async (dispatch) => {
  dispatch(fetchWeatherStart());
  try {
    console.log("Key => ", process.env.REACT_APP_WEATHER_API_KEY);
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    );
    console.log("Current Weather => ", response.data);
    dispatch(fetchWeatherSuccess(response.data));
  } catch (error) {
    dispatch(fetchWeatherFailure(error.message));
  }
};

export default weatherSlice.reducer;
