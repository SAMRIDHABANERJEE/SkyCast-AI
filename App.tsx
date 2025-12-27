import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Navigation, 
  MapPin, 
  Calendar, 
  RefreshCcw,
  Sparkles,
  ChevronRight,
  Loader2,
  ExternalLink,
  Globe,
  XCircle,
  Wind
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { AppState } from './types.ts';
import { getMockWeather, getMockHourly, getMockDaily } from './services/mockWeather.ts';
import { getAIWeatherInsight, fetchRealTimeWeather } from './services/geminiService.ts';
import Sidebar from './components/Sidebar.tsx';
import { WeatherIcon } from './components/WeatherIcons.tsx';
import WeatherHighlights from './components/WeatherHighlights.tsx';

const FEATURED_CITIES = ['Washington D.C.', 'Midnapore', 'Kolkata', 'New York', 'London', 'Tokyo', 'Sydney'];

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    weather: null,
    hourly: [],
    daily: [],
    loading: true,
    error: null,
    aiInsight: null,
    sources: []
  });

  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = useCallback(async (location: string, useAI: boolean = true) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      if (useAI) {
        const data = await fetchRealTimeWeather(location);
        setState(prev => ({
          ...prev,
          weather: data.weather,
          hourly: data.hourly,
          daily: data.daily,
          sources: data.sources,
          loading: false,
          error: null
        }));

        getAIWeatherInsight(data.weather).then(insight => {
          setState(prev => ({ ...prev, aiInsight: insight }));
        }).catch(() => {});
      } else {
        await new Promise(r => setTimeout(r, 1000));
        const weather = getMockWeather(location);
        setState(prev => ({
          ...prev,
          weather,
          hourly: getMockHourly(),
          daily: getMockDaily(),
          loading: false,
          sources: [],
          error: null
        }));
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: err.message || "Weather data currently unavailable." 
      }));
    }
  }, []);

  useEffect(() => {
    fetchData('Washington D.C.', true);
  }, [fetchData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchData(searchQuery, true);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchData(`${pos.coords.latitude}, ${pos.coords.longitude}`, true);
        },
        () => {
          setState(prev => ({ 
            ...prev, 
            error: "Location access denied. Please type your city manually." 
          }));
        }
      );
    }
  };

  if (state.loading && !state.weather) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0B0C10] text-white">
        <Loader2 className="animate-spin text-blue-500 mb-6" size={56} />
        <h1 className="text-2xl font-bold tracking-[0.2em] uppercase mb-2">SkyCast AI</h1>
        <p className="text-gray-500 text-sm font-medium tracking-wide">Syncing with orbital sensor network...</p>
      </div>
    );
  }

  const { weather, hourly, daily, aiInsight, sources } = state;

  return (
    <div className="flex min-h-screen bg-[#0B0C10] text-gray-100">
      <Sidebar />

      <main className="flex-1 p-4 lg:p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row gap-6 items-center justify-between mb-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-black text-white tracking-tight">SkyCast <span className="text-blue-500">AI</span></h1>
              <div className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                LIVE STATUS
              </div>
            </div>
            <p className="text-gray-500 text-xs mt-1">Intelligent atmospheric monitoring dashboard.</p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <form onSubmit={handleSearch} className="relative flex-1 md:w-[400px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search city (e.g. Midnapore)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1A1C23] border border-gray-800 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-all shadow-xl"
              />
              {state.loading && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Loader2 className="animate-spin text-blue-500" size={18} />
                </div>
              )}
            </form>
            <button 
              onClick={getUserLocation}
              title="Current Location"
              className="bg-[#1A1C23] border border-gray-800 hover:border-blue-500 hover:text-blue-500 text-white p-3.5 rounded-2xl transition-all shadow-lg"
            >
              <Navigation size={22} />
            </button>
          </div>
        </header>

        {state.error && (
          <div className="mb-8 p-5 bg-red-500/5 border border-red-500/20 text-red-200 rounded-2xl flex items-center justify-between shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-4">
              <div className="bg-red-500/20 p-2 rounded-lg text-red-500"><XCircle size={20} /></div>
              <span className="text-sm font-medium">{state.error}</span>
            </div>
            <button onClick={() => setState(prev => ({...prev, error: null}))} className="text-xs font-black uppercase p-2 hover:bg-white/5 rounded-lg transition-colors">Dismiss</button>
          </div>
        )}

        <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
            <Globe size={14} /> Global Hubs:
          </div>
          {FEATURED_CITIES.map(city => (
            <button 
              key={city}
              onClick={() => fetchData(city, true)}
              className={`px-4 py-2 rounded-xl bg-[#1A1C23] border text-xs font-medium transition-all whitespace-nowrap ${
                weather?.city === city ? 'border-blue-500 text-white' : 'border-gray-800 text-gray-400 hover:border-blue-500 hover:text-white'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 flex flex-col gap-10">
            {weather && (
              <div className={`glass-card p-10 relative overflow-hidden group shadow-2xl border-white/5 transition-opacity duration-300 ${state.loading ? 'opacity-50' : 'opacity-100'}`}>
                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-56 h-56 bg-blue-500/10 rounded-full blur-[80px]"></div>
                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div>
                    <h2 className="text-4xl font-extrabold text-white tracking-tight">{weather.city}</h2>
                    <p className="text-gray-500 font-bold flex items-center gap-1.5 mt-2 text-sm uppercase tracking-widest">
                      <MapPin size={16} className="text-blue-500" /> {weather.country}
                    </p>
                  </div>
                  <button onClick={() => fetchData(weather.city, true)} className="p-3 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors">
                    <RefreshCcw size={20} className={state.loading ? 'animate-spin' : ''} />
                  </button>
                </div>
                <div className="flex items-center gap-8 mb-10 relative z-10">
                  <div className="text-8xl font-black text-white tracking-tighter leading-none">{Math.round(weather.temp)}°</div>
                  <div className="flex flex-col items-center gap-1">
                    <WeatherIcon code={weather.icon} size={64} className="drop-shadow-lg" />
                    <span className="text-sm font-black text-blue-400 uppercase tracking-widest">{weather.condition}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-6 pt-8 border-t border-white/5 relative z-10">
                  <div className="flex items-center gap-4 text-gray-400">
                    <Calendar size={18} />
                    <span className="text-sm font-bold uppercase tracking-wide">{weather.date}</span>
                  </div>
                  <p className="text-gray-500 text-sm italic leading-relaxed">"{weather.description}"</p>
                </div>
              </div>
            )}

            <div className="glass-card p-8 border-blue-500/10 bg-gradient-to-br from-[#1E202C] to-[#0B0C10] shadow-xl">
              <div className="flex items-center gap-2 mb-4 text-blue-400 font-black uppercase text-[10px] tracking-[0.3em]">
                <Sparkles size={14} /> AI Analysis
              </div>
              <p className="text-gray-200 text-sm leading-relaxed">{aiInsight || "Streaming atmospheric intelligence..."}</p>
            </div>

            {sources.length > 0 && (
              <div className="glass-card p-6 border-white/5 shadow-lg">
                <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-4">Grounding Context</h3>
                <div className="flex flex-col gap-2">
                  {sources.slice(0, 3).map((s, i) => (
                    <a key={i} href={s.uri} target="_blank" rel="noopener noreferrer" className="text-[11px] flex items-center justify-between bg-white/[0.02] p-2.5 rounded-xl border border-white/5 hover:text-blue-400 hover:border-blue-500/30 transition-all">
                      <span className="truncate pr-4">{s.title}</span>
                      <ExternalLink size={10} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-8 flex flex-col gap-10">
            {weather && <WeatherHighlights data={weather} />}

            <div className="glass-card p-10 border-white/5 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                <div className="flex flex-col">
                  <h2 className="text-xl font-black text-white uppercase tracking-widest">Thermodynamic Cycle</h2>
                  <p className="text-gray-500 text-xs font-bold uppercase mt-1">24 Hour Prediction</p>
                </div>
                <div className="bg-blue-600/10 text-blue-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">STATION FEED</div>
              </div>
              
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourly}>
                    <defs>
                      <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="time" 
                      stroke="#4B5563" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                      dy={10} 
                    />
                    <YAxis hide={true} domain={['dataMin - 2', 'dataMax + 2']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1C23', border: '1px solid #374151', borderRadius: '12px', fontSize: '12px', color: '#fff' }} 
                      itemStyle={{ color: '#3B82F6' }}
                    />
                    <Area type="monotone" dataKey="temp" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorTemp)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="flex overflow-x-auto gap-6 mt-10 pb-4 scrollbar-hide">
                {hourly.map((h, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 min-w-[80px] p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                    <span className="text-[10px] font-black text-gray-500 uppercase">{h.time}</span>
                    <WeatherIcon code={h.icon} size={28} />
                    <span className="text-base font-black text-white">{Math.round(h.temp)}°</span>
                    <div className="flex items-center gap-1 text-[9px] text-blue-500 font-black">
                      <Wind size={10} /> {h.windSpeed}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-8 border-white/5 shadow-xl">
              <h2 className="text-lg font-black text-white uppercase tracking-widest mb-8 border-b border-white/5 pb-4">7-Day Extended Forecast</h2>
              <div className="flex flex-col gap-3">
                {daily.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.03] transition-all group">
                    <div className="flex items-center gap-5 flex-1">
                      <WeatherIcon code={item.icon} size={24} />
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-sm">{idx === 0 ? 'Today' : item.day}</span>
                        <span className="text-gray-500 text-[10px] font-black uppercase">{item.date}</span>
                      </div>
                    </div>
                    <span className="text-white font-black text-lg">{Math.round(item.temp)}°</span>
                    <ChevronRight size={16} className="text-gray-700 group-hover:text-blue-500 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 pb-12">
          <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">© SkyCast AI Global Intelligence Network</p>
          <div className="flex gap-8">
            {['Privacy', 'Network Status', 'Compliance', 'Policy'].map(link => (
              <a key={link} href="#" className="text-gray-600 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em]">{link}</a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;