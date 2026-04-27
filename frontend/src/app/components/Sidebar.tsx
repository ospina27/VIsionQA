import { Link, useLocation } from "react-router";
import { 
  Video, 
  ClipboardCheck, 
  FileText, 
  Settings,
  Home
} from "lucide-react";

export function Sidebar({ station }: { station?: string }) {
  const location = useLocation();
  
  const navItems = [
    { path: "/inspeccion", icon: Video, label: "Transmisión en Vivo" },
    { path: "/criterios", icon: ClipboardCheck, label: "Criterios" },
    { path: "/reportes", icon: FileText, label: "Reportes" },
    { path: "/admin", icon: Settings, label: "Administración" },
  ];

  const bottomItems = [
    { path: "/setup", icon: Home, label: "Nuevo Lote" },
  ];

  return (
    <div className="w-60 lg:w-64 bg-[#0a0a0a] border-r border-gray-800 flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-800">
        <h1 className="text-white text-lg md:text-xl font-bold tracking-wide">COMANDO-CC</h1>
        {station && (
          <p className="text-gray-500 text-xs md:text-sm mt-1">{station}</p>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 md:p-4 space-y-1 md:space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 md:px-4 py-3 md:py-4 rounded transition-colors
                min-h-[56px] md:min-h-[64px] text-sm md:text-base
                ${isActive 
                  ? 'bg-[#1a1a1a] text-[#ff6b6b]' 
                  : 'text-gray-400 hover:bg-[#151515] hover:text-gray-200'
                }
              `}
            >
              <Icon size={18} className="md:w-5 md:h-5 flex-shrink-0" />
              <span className="line-clamp-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 md:p-4 space-y-1 md:space-y-2 border-t border-gray-800">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 md:px-4 py-3 md:py-4 rounded transition-colors
                min-h-[56px] md:min-h-[64px] text-sm md:text-base
                ${isActive 
                  ? 'bg-[#1a1a1a] text-[#ff6b6b]' 
                  : 'text-gray-400 hover:bg-[#151515] hover:text-gray-200'
                }
              `}
            >
              <Icon size={18} className="md:w-5 md:h-5 flex-shrink-0" />
              <span className="line-clamp-1">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Emergency Button */}
      <div className="p-3 md:p-4">
        <button className="w-full bg-[#ff3b3b] hover:bg-[#ff1f1f] active:bg-[#ff0000] text-white font-bold py-4 md:py-5 px-4 md:px-6 rounded transition-colors min-h-[56px] md:min-h-[64px] text-sm md:text-base">
          PARADA DE EMERGENCIA
        </button>
      </div>
    </div>
  );
}