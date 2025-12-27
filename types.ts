
export interface GroundingSource {
  title: string;
  uri: string;
}

export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  condition: string;
  description: string;
  date: string;
  icon: string;
  humidity: number;
  pressure: number;
  visibility: number;
  feelsLike: number;
  uvIndex: number;
  windSpeed: number;
  windDir: string;
  sunrise: string;
  sunset: string;
  aqi: number;
  aqiLabel: 'Good' | 'Fair' | 'Moderate' | 'Poor' | 'Very Poor';
}

export interface HourlyForecast {
  time: string;
  temp: number;
  icon: string;
  windSpeed: number;
}

export interface DailyForecast {
  day: string;
  date: string;
  temp: number;
  icon: string;
  description: string;
}

export interface AppState {
  weather: WeatherData | null;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  loading: boolean;
  error: string | null;
  aiInsight: string | null;
  sources: GroundingSource[];
}
