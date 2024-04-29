import { combineReducers } from '@reduxjs/toolkit';
import weatherReducer from './weatherReducer';
import forecastReducer from './forecastReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
  forecast: forecastReducer,
});

export default rootReducer;
