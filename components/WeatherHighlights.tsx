
import React from 'react';
import { 
  Wind, 
  Droplets, 
  Eye, 
  Thermometer, 
  Sun, 
  Sunrise, 
  Sunset,
  Zap
} from 'lucide-react';
import { WeatherData } from '../types';

interface HighlightsProps {
  data: WeatherData;
}

const HighlightCard: React.FC<{
  title: string;
  value: string | number;
  unit?: string;
  label?: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, unit, label, icon, color }) => (
  <div className="glass-card p-6 flex flex-col justify-between hover:border-gray-700 transition-colors">
    <div className="flex justify-between items-start">
      <h3 className="text-gray-400 font-medium text-sm uppercase tracking-wider">{title}</h3>
      <div className={`${color} p-2 rounded-lg bg-opacity-10`}>{icon}</div>
    </div>
    <div className="mt-4">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-white">{value}</span>
        {unit && <span className="text-gray-400 text-sm">{unit}</span>}
      </div>
      {label && <p className="text-xs text-gray-400 mt-1 font-medium">{label}</p>}
    </div>
  </div>
);

const WeatherHighlights: React.FC<HighlightsProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-white">Today's Highlights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Air Quality */}
        <div className="glass-card p-6 md:col-span-2 flex flex-col justify-between border-blue-500/20">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-400 font-medium text-sm uppercase tracking-wider">Air Quality Index</h3>
            <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase">
              {data.aqiLabel}
            </span>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-blue-500"><Wind size={32} /></div>
            <div className="grid grid-cols-5 gap-4 flex-1">
              {[
                { label: 'PM2.5', value: '1.25' },
                { label: 'SO2', value: '2.1' },
                { label: 'NO2', value: '1.4' },
                { label: 'O3', value: '15' },
                { label: 'CO', value: '45' }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-[10px] text-gray-500 mb-1">{item.label}</p>
                  <p className="text-sm font-bold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sunrise & Sunset */}
        <div className="glass-card p-6 md:col-span-2 flex flex-col justify-between border-orange-500/20">
          <h3 className="text-gray-400 font-medium text-sm uppercase tracking-wider mb-4">Sunrise & Sunset</h3>
          <div className="flex justify-around items-center h-full">
            <div className="flex items-center gap-4">
              <div className="text-orange-400 p-3 bg-orange-400/10 rounded-2xl"><Sunrise size={28} /></div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Sunrise</p>
                <p className="text-xl font-bold text-white">{data.sunrise}</p>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-800 hidden sm:block"></div>
            <div className="flex items-center gap-4">
              <div className="text-orange-400 p-3 bg-orange-400/10 rounded-2xl"><Sunset size={28} /></div>
              <div>
                <p className="text-xs text-gray-500 uppercase">Sunset</p>
                <p className="text-xl font-bold text-white">{data.sunset}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Small Metrics */}
        <HighlightCard 
          title="Humidity" 
          value={data.humidity} 
          unit="%" 
          label="Moderate" 
          icon={<Droplets size={20} />} 
          color="text-blue-400" 
        />
        <HighlightCard 
          title="Visibility" 
          value={data.visibility} 
          unit="km" 
          label="Clear sky" 
          icon={<Eye size={20} />} 
          color="text-white" 
        />
        <HighlightCard 
          title="Feels Like" 
          value={data.feelsLike} 
          unit="°" 
          label="Warmer" 
          icon={<Thermometer size={20} />} 
          color="text-red-400" 
        />
        <HighlightCard 
          title="UV Index" 
          value={data.uvIndex} 
          label="Low Risk" 
          icon={<Zap size={20} />} 
          color="text-yellow-400" 
        />
      </div>
    </div>
  );
};

export default WeatherHighlights;
