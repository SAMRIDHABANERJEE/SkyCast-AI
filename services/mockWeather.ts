import { WeatherData, HourlyForecast, DailyForecast } from '../types.ts';

export const getMockWeather = (city: string = 'London'): WeatherData => ({
  city,
  country: 'GB',
  temp: 24,
  condition: 'Cloudy',
  description: 'Broken Clouds',
  date: new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }),
  icon: '04d',
  humidity: 64,
  pressure: 1012,
  visibility: 10,
  feelsLike: 26,
  uvIndex: 4,
  windSpeed: 12,
  windDir: 'NW',
  sunrise: '06:12 AM',
  sunset: '08:45 PM',
  aqi: 22,
  aqiLabel: 'Good'
});

export const getMockHourly = (): HourlyForecast[] => {
  const hours = ['09 AM', '12 PM', '03 PM', '06 PM', '09 PM', '12 AM', '03 AM', '06 AM'];
  return hours.map((time, i) => ({
    time,
    temp: 22 + Math.floor(Math.random() * 5),
    icon: i % 2 === 0 ? '01d' : '02d',
    windSpeed: 10 + i
  }));
};

export const getMockDaily = (): DailyForecast[] => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date().getDay();
  return days.map((day, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      day: d.toLocaleDateString('en-GB', { weekday: 'long' }),
      date: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      temp: 20 + Math.floor(Math.random() * 8),
      icon: i % 3 === 0 ? '01d' : '04d',
      description: i % 3 === 0 ? 'Sunny' : 'Cloudy'
    };
  });
};