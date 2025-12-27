
import { GoogleGenAI } from "@google/genai";
import { WeatherData, HourlyForecast, DailyForecast, GroundingSource } from "../types.ts";

// Helper to get fresh client
const getAIClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIWeatherInsight = async (weather: WeatherData): Promise<string> => {
  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a short, 2-sentence sophisticated weather insight for ${weather.city}. Current: ${weather.temp}°C, ${weather.description}. Suggest a practical tip.`,
    });
    return response.text || "Conditions are optimal for outdoor activities.";
  } catch (error) {
    return "Weather patterns are currently following seasonal norms.";
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
    Find the real-time weather, a full 24-hour hourly forecast (one entry per 2-3 hours), and a 7-day daily forecast for ${city}.
    
    Return the data as a JSON object with this structure:
    {
      "weather": {
        "city": "string", "country": "string", "temp": number, "condition": "string",
        "description": "string", "humidity": number, "pressure": number, "visibility": number,
        "feelsLike": number, "uvIndex": number, "windSpeed": number, "windDir": "string",
        "sunrise": "string", "sunset": "string", "aqi": number, "aqiLabel": "Good|Fair|Moderate|Poor|Very Poor"
      },
      "hourly": [ { "time": "10 AM", "temp": number, "icon": "01d", "windSpeed": number } ],
      "daily": [ { "day": "Monday", "date": "15 May", "temp": number, "icon": "01d", "description": "string" } ]
    }
    Use icon codes: 01d (sun), 02d (partly cloudy), 04d (clouds), 09d (rain), 10d (heavy rain), 11d (thunder), 13d (snow), 50d (mist).
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

    // Improved regex to handle cases where Gemini wraps JSON in markdown blocks
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error("No JSON found in response:", text);
      throw new Error("Format mismatch");
    }
    
    const data = JSON.parse(jsonMatch[0]);
    data.weather.date = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });
    if (!data.weather.icon) data.weather.icon = '01d';
    
    return { ...data, sources };
  } catch (e) {
    console.error("Fetch Error:", e);
    throw new Error(`Unable to reach the weather station for "${city}". Please try another city or check your connection.`);
  }
};
