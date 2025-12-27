import { GoogleGenAI } from "@google/genai";
import { WeatherData, HourlyForecast, DailyForecast, GroundingSource } from "../types.ts";

// Create client using the platform-provided API key directly
const getAIClient = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY is not defined in process.env");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
};

export const getAIWeatherInsight = async (weather: WeatherData): Promise<string> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a short, 2-sentence sophisticated weather insight for ${weather.city}, ${weather.country}. Current: ${weather.temp}°C, ${weather.description}. Suggest a practical lifestyle or travel tip based on this.`,
    });
    return response.text || "Weather patterns are steady today.";
  } catch (error) {
    console.error("AI Insight Error:", error);
    return "Conditions are optimal for typical seasonal activities.";
  }
};

export const fetchRealTimeWeather = async (city: string): Promise<{ 
  weather: WeatherData; 
  hourly: HourlyForecast[]; 
  daily: DailyForecast[];
  sources: GroundingSource[];
}> => {
  const ai = getAIClient();
  const prompt = `
    Search for the current real-time weather and forecast for the location: "${city}".
    
    CRITICAL: If the location "${city}" does not exist, is fictional, or cannot be found, respond ONLY with this JSON:
    {"error": "Location not found"}

    Otherwise, return a JSON object with:
    1. "weather": Current conditions (city, country, temp in C, condition, description, humidity, pressure, visibility, feelsLike, uvIndex, windSpeed, windDir, sunrise, sunset, aqi, aqiLabel).
    2. "hourly": 24-hour forecast (8-10 entries).
    3. "daily": 7-day forecast.

    Format the response as raw JSON.
  `;

  try {
    const result = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }]
      },
    });

    const text = result.text || "";
    const sources: GroundingSource[] = result.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || 'Weather Data',
      uri: chunk.web?.uri || '#'
    })).filter((s: any) => s.uri !== '#') || [];

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Could not parse weather data from response.");
    
    const data = JSON.parse(jsonMatch[0]);
    
    if (data.error) {
      throw new Error(`The location "${city}" could not be found.`);
    }

    // Add client-side date processing
    data.weather.date = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });
    if (!data.weather.icon) data.weather.icon = '01d';
    
    return { ...data, sources };
  } catch (e: any) {
    console.error("fetchRealTimeWeather Error:", e);
    throw new Error(e.message || "Failed to fetch weather data.");
  }
};