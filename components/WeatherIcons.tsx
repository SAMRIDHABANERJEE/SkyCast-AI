
import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudDrizzle, 
  Wind,
  Moon
} from 'lucide-react';

interface IconProps {
  code: string;
  size?: number;
  className?: string;
}

export const WeatherIcon: React.FC<IconProps> = ({ code, size = 24, className = "" }) => {
  // Simple mapping based on common OpenWeatherMap icons
  if (code.includes('01')) return <Sun size={size} className={`text-yellow-400 ${className}`} />;
  if (code.includes('02') || code.includes('03') || code.includes('04')) 
    return <Cloud size={size} className={`text-gray-400 ${className}`} />;
  if (code.includes('09') || code.includes('10')) 
    return <CloudRain size={size} className={`text-blue-400 ${className}`} />;
  if (code.includes('11')) 
    return <CloudLightning size={size} className={`text-purple-400 ${className}`} />;
  if (code.includes('13')) 
    return <CloudSnow size={size} className={`text-white ${className}`} />;
  if (code.includes('50')) 
    return <Wind size={size} className={`text-gray-200 ${className}`} />;
  
  return <Cloud size={size} className={`text-gray-400 ${className}`} />;
};
