import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import weatherReducer from './reducers/weatherReducer';
import forecastReducer from './reducers/forecastReducer';

// Mock fetchWeatherData and fetchForecastData actions
jest.mock('./reducers/weatherReducer', () => ({
  ...jest.requireActual('./reducers/weatherReducer'),
  fetchWeatherData: jest.fn(),
}));
jest.mock('./reducers/forecastReducer', () => ({
  ...jest.requireActual('./reducers/forecastReducer'),
  fetchForecastData: jest.fn(),
}));

describe('App', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        weather: weatherReducer,
        forecast: forecastReducer,
      },
    });
  });

  test('renders correctly', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByLabelText('Enter location eg. city, zipcode etc.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fetch Weather' })).toBeInTheDocument();
  });

  test('displays loading indicator when fetching weather data', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Fetch Weather' }));

    expect(screen.getByRole('button', { name: 'Fetch Weather' })).toBeDisabled();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => expect(screen.getByRole('button', { name: 'Fetch Weather' })).not.toBeDisabled());
  });

  test('dispatches fetchWeatherData and fetchForecastData actions when clicking fetch button', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Enter location eg. city, zipcode etc.'), { target: { value: 'New York' } });
    fireEvent.click(screen.getByRole('button', { name: 'Fetch Weather' }));

    expect(weatherReducer.actions).toContainEqual({ type: 'weather/fetchWeatherData/pending', meta: expect.anything(), payload: undefined });
    expect(forecastReducer.actions).toContainEqual({ type: 'forecast/fetchForecastData/pending', meta: expect.anything(), payload: undefined });
  });
});
