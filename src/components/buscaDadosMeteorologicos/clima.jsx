import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Container, Grid, Paper, Typography, SwipeableDrawer } from '@mui/material';

const WeatherForecast = () => {
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [drawerOpen, setDrawerOpen] = useState(false); // Estado para controlar a abertura do carrossel
  const city = 'Rio Grande, BR'; // Localização definida como Rio Grande, Rio Grande do Sul

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'd61747364ea9ac3b0d12413a5a04d707'; // Substitua pelo seu próprio API Key do OpenWeatherMap
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(apiUrl);
        const filteredData = response.data.list.filter(item => new Date(item.dt * 1000).getHours() === 12);
        setForecastData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados da previsão do tempo:', error);
        setError('Erro ao buscar dados da previsão do tempo.');
        setLoading(false);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Atualiza a data a cada minuto

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentDayIndex = forecastData.findIndex(item => new Date(item.dt * 1000).toLocaleDateString('pt-BR') === currentDate.toLocaleDateString('pt-BR'));
    setCurrentIndex(currentDayIndex !== -1 ? currentDayIndex : 0);
  }, [currentDate, forecastData]);

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

  const handleSwipeLeft = () => {
    setCurrentIndex(prevIndex => (prevIndex < forecastData.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const handleSwipeRight = () => {
    setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
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
      <Typography variant="h4" align="center" gutterBottom>{city}, {new Date(forecastData[currentIndex].dt * 1000).toLocaleDateString('pt-BR')}</Typography>
      <Paper elevation={3} style={{ padding: '20px' }} onClick={handleDrawerOpen}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <img src={`https://openweathermap.org/img/wn/${forecastData[currentIndex].weather[0].icon}.png`} alt="Weather Icon" />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">{translateWeatherCondition(forecastData[currentIndex].weather[0].main)}</Typography>
            <Typography variant="subtitle1">Temperatura: {forecastData[currentIndex].main.temp} °C</Typography>
            <Typography variant="subtitle1">Umidade: {forecastData[currentIndex].main.humidity}%</Typography>
            <Typography variant="subtitle1">Chance de Chuva: {forecastData[currentIndex].pop * 100}%</Typography>
          </Grid>
        </Grid>
      </Paper>
      <SwipeableDrawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom>Previsão do Tempo para os Próximos 5 Dias em {city}</Typography>
          <Grid container>
            {forecastData.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Paper elevation={3} style={{ padding: '20px', marginBottom: '10px' }}>
                  <Typography variant="subtitle1">{new Date(item.dt * 1000).toLocaleDateString('pt-BR', { weekday: 'long' })}</Typography>
                  <Typography variant="subtitle2">{new Date(item.dt * 1000).toLocaleDateString('pt-BR')}</Typography>
                  <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="Weather Icon" />
                  <Typography variant="subtitle1">{translateWeatherCondition(item.weather[0].main)}</Typography>
                  <Typography variant="subtitle1">Temperatura: {item.main.temp} °C</Typography>
                  
                  <Typography variant="subtitle1">Temperatura Mínima: {item.main.temp_min} °C</Typography>
                  <Typography variant="subtitle1">Temperatura Máxima: {item.main.temp_max} °C</Typography>
                  <Typography variant="subtitle1">Umidade: {item.main.humidity}%</Typography>
                  <Typography variant="subtitle1">Chance de Chuva: {item.pop * 100}%</Typography>
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
