
import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  List, 
  Settings, 
  CloudSun,
  LogOut
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const navItems = [
    { icon: <LayoutDashboard size={22} />, label: 'Weather', active: true },
    { icon: <Map size={22} />, label: 'Cities', active: false },
    { icon: <List size={22} />, label: 'Map', active: false },
    { icon: <Settings size={22} />, label: 'Settings', active: false },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-24 bg-[#14151B] h-screen sticky top-0 py-8 items-center justify-between border-r border-gray-800">
      <div className="flex flex-col items-center gap-12">
        <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-900/20">
          <CloudSun size={28} />
        </div>
        
        <nav className="flex flex-col gap-8">
          {navItems.map((item, idx) => (
            <button 
              key={idx}
              className={`p-3 rounded-xl transition-all duration-300 group relative ${
                item.active 
                  ? 'bg-blue-600/10 text-blue-500' 
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'
              }`}
            >
              {item.icon}
              <span className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <button className="text-gray-500 hover:text-red-400 p-3 rounded-xl transition-colors">
        <LogOut size={22} />
      </button>
    </aside>
  );
};

export default Sidebar;
