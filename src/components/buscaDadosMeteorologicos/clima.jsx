import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Container, Grid, Paper, Typography, SwipeableDrawer } from '@mui/material';

const WeatherForecast = ({cidade}) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false); // Estado para controlar a abertura do carrossel
  const city = cidade; // Localização definida como Rio Grande, Rio Grande do Sul

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'd61747364ea9ac3b0d12413a5a04d707'; // Substitua pela sua chave de API do OpenWeatherMap
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        const [currentWeatherResponse, forecastResponse] = await Promise.all([
          axios.get(currentWeatherUrl),
          axios.get(forecastUrl)
        ]);

        setCurrentWeather(currentWeatherResponse.data);
        setForecastData(forecastResponse.data.list.filter(item => item.dt_txt.includes('12:00')));
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados da previsão do tempo:', error);
        setError('Erro ao buscar dados da previsão do tempo.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const translateWeatherCondition = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Rain':
        return 'Chuva';
      case 'Clouds':
        return 'Nublado';
      case 'Clear':
        return 'Tempo Limpo';
      default:
        return 'Desconhecido';
    }
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  if (loading) return <CircularProgress />; // Exibe um spinner de carregamento enquanto os dados estão sendo buscados
  if (error) return <div>{error}</div>;

  return (
    <Container maxWidth="lg">
           <Typography variant="h5" gutterBottom>{(city).toUpperCase()}</Typography>
           <Typography variant="subtitle1">{new Date().toLocaleDateString('pt-BR', { weekday: 'long' }).toUpperCase()}, {new Date().toLocaleDateString('pt-BR')}</Typography>
        
       {currentWeather && (
    <Paper elevation={3} style={{ padding: '12px', fontSize:'98%', marginBottom: '20px', display: 'flex', alignItems: 'center' }} onClick={handleDrawerOpen}>
           

      <div style={{ flex: 1 }}>

        <Typography variant="subtitle1">{translateWeatherCondition(currentWeather.weather[0].main)}</Typography>
        <Typography variant="subtitle1">Temperatura: {currentWeather.main.temp} °C</Typography>
        <Typography variant="subtitle1">Umidade: {currentWeather.main.humidity}%</Typography>
        <Typography variant="subtitle1">Chance de Chuva: {currentWeather.rain ? currentWeather.rain['1h'] : 0}%</Typography>
      </div>
      <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`} alt="Weather Icon" style={{ marginLeft: '20px' }} />
    </Paper>
  )}

      {/* SwipeableDrawer para mostrar a previsão do tempo para a próxima semana */}
      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      >
        <Container maxWidth="lg" style={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>Previsão do Tempo para a Próxima Semana ({city})</Typography>
          <Grid container spacing={2}>
            {forecastData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} style={{ padding: '10px' }}>
              <Typography variant="h5" gutterBottom>{city}</Typography>
              <Typography variant="subtitle1">{new Date(item.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long' })}, {new Date(item.dt * 1000).toLocaleDateString('pt-BR')}</Typography>
              <Typography variant="subtitle1">{translateWeatherCondition(item.weather[0].main)}</Typography>
              <Typography variant="subtitle1">Temperatura: {item.main.temp} °C</Typography>
              <Typography variant="subtitle1">Umidade: {item.main.humidity}%</Typography>
              <Typography variant="subtitle1">Chance de Chuva: {item.pop * 100}%</Typography>
              <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="Weather Icon" />
            </Paper>
          </Grid>
            ))}
          </Grid>
        </Container>
      </SwipeableDrawer>
    </Container>
  );
};

export default WeatherForecast;
