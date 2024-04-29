import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import { fetchWeatherData } from "./reducers/weatherReducer";
import { fetchForecastData } from "./reducers/forecastReducer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", // Weather section color
    },
    secondary: {
      main: "#ff5722", // Forecast section color
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const currentWeather = useSelector((state) => state.weather.weather);
  const forecast = useSelector((state) => state.forecast.forecast);
  const loadingWeather = useSelector((state) => state.weather.loading);
  const loadingForecast = useSelector((state) => state.forecast.loading);
  const error = useSelector(
    (state) => state.weather.error || state.forecast.error
  );

  // Dispatches the fetchWeatherData and fetchForecastData
  const handleFetchWeather = () => {
    if (query.trim() !== "") {
      dispatch(fetchWeatherData(query));
      dispatch(fetchForecastData(query));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" style={{ minHeight: "100vh" }}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: "20px", marginBottom: "20px" }}>
            <TextField
              label="Enter location eg. city, zipcode etc."
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleFetchWeather}
              disabled={loadingWeather || loadingForecast}
              style={{ marginTop: "10px" }}
            >
              {loadingWeather || loadingForecast ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Fetch Weather"
              )}
            </Button>
            {error && (
              <Typography
                variant="body1"
                color="error"
                style={{ marginTop: "10px" }}
              >
                Error: {error}
              </Typography>
            )}
          </Paper>
          {currentWeather && (
            <Paper
              style={{
                padding: "20px",
                marginBottom: "20px",
                backgroundColor: theme.palette.primary.main,
              }}
            >
              <Typography variant="h4" style={{ color: "#fff" }}>
                Current Weather Details
              </Typography>
              <Typography variant="body1" style={{ color: "#fff" }}>
                Temperature: {currentWeather.main.temp} °C
              </Typography>
              <Typography variant="body1" style={{ color: "#fff" }}>
                Feels Like : {currentWeather.main.feels_like} °C
              </Typography>
              <Typography variant="body1" style={{ color: "#fff" }}>
                Wind Speed: {currentWeather.wind.speed} m/s
              </Typography>
              <Typography variant="body1" style={{ color: "#fff" }}>
                Max Temperature: {currentWeather.main.temp_max} °C
              </Typography>
              <Typography variant="body1" style={{ color: "#fff" }}>
                Min Temperature: {currentWeather.main.temp_min} °C
              </Typography>
              <Typography variant="body1" style={{ color: "#fff" }}>
                Humidity: {currentWeather.main.humidity}%
              </Typography>
              <Typography variant="body1" style={{ color: "#fff" }}>
                Pressure: {currentWeather.main.pressure} hPa
              </Typography>
            </Paper>
          )}
          {forecast && (
            <Paper
              style={{
                padding: "20px",
                backgroundColor: theme.palette.secondary.main,
              }}
            >
              <Typography variant="h4" style={{ color: "#fff" }}>
                Weather Forecast for next few hours
              </Typography>
              {forecast.map((item, index) => (
                <div key={index}>
                  <Typography variant="body1" style={{ color: "#fff" }}>
                    Date: {item.dt_txt}, Temperature: {item.main.temp} °C,
                    Humidity: {item.main.humidity}%
                  </Typography>
                </div>
              ))}
            </Paper>
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
