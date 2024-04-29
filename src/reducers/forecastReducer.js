import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  forecast: null,
  loading: false,
  error: null,
};

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    fetchForecastStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchForecastSuccess(state, action) {
      state.forecast = action.payload;
      state.loading = false;
    },
    fetchForecastFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchForecastStart,
  fetchForecastSuccess,
  fetchForecastFailure,
} = forecastSlice.actions;
export const fetchForecastData = (query) => async (dispatch) => {
  dispatch(fetchForecastStart());
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    );
    console.log("Weather Forecast => ", response.data.list);
    dispatch(fetchForecastSuccess(response.data.list));
  } catch (error) {
    dispatch(fetchForecastFailure(error.message));
  }
};
export default forecastSlice.reducer;
