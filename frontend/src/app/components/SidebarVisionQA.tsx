import { useNavigate } from "react-router";
import { Camera, FileText, AlertTriangle, Settings, BookOpen, ClipboardList, LogOut, Power } from "lucide-react";

interface SidebarVisionQAProps {
  active: "transmision" | "criterios" | "reportes" | "sistema";
}

export function SidebarVisionQA({ active }: SidebarVisionQAProps) {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "transmision",
      label: "Transmisión en Vivo",
      icon: Camera,
      path: "/dashboard",
      color: active === "transmision" ? "#3b82f6" : "#71717a",
    },
    {
      id: "criterios",
      label: "Criterios",
      icon: BookOpen,
      path: "/criterios",
      color: active === "criterios" ? "#3b82f6" : "#71717a",
    },
    {
      id: "reportes",
      label: "Reportes",
      icon: FileText,
      path: "/reportes",
      color: active === "reportes" ? "#3b82f6" : "#71717a",
    },
    {
      id: "sistema",
      label: "Sistema",
      icon: Settings,
      path: "/admin",
      color: active === "sistema" ? "#3b82f6" : "#71717a",
    },
  ];

  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-[#0e0e0e] border-r border-[rgba(39,39,42,0.3)] z-40 pt-16">
      {/* Logo */}
      <div className="px-6 py-8">
        <div className="text-[#3b82f6] font-['Space_Grotesk'] font-bold text-2xl tracking-tight">
          VISIONQA
        </div>
        <div className="text-[#71717a] font-['Inter'] text-xs mt-1">
          ESTACIÓN_04
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="px-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-4 rounded transition-colors min-h-[64px] ${
                isActive
                  ? "bg-[#1c1b1b] border-l-4 border-[#3b82f6]"
                  : "hover:bg-[#1a1a1a]"
              }`}
            >
              <Icon size={24} style={{ color: item.color }} />
              <span
                className="font-['Space_Grotesk'] font-medium text-sm"
                style={{ color: item.color }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2 border-t border-[rgba(39,39,42,0.3)]">
        <button
          className="w-full flex items-center gap-3 px-3 py-3 rounded hover:bg-[#1a1a1a] transition-colors"
          onClick={() => navigate("/emergencia")}
        >
          <AlertTriangle size={20} className="text-[#a1a1aa]" />
          <span className="text-[#a1a1aa] font-['Space_Grotesk'] text-xs">Alertas</span>
        </button>

        <button
          className="w-full flex items-center gap-3 px-3 py-3 rounded hover:bg-[#1a1a1a] transition-colors"
          onClick={() => navigate("/registros")}
        >
          <ClipboardList size={20} className="text-[#a1a1aa]" />
          <span className="text-[#a1a1aa] font-['Space_Grotesk'] text-xs">Registros</span>
        </button>

        <div className="pt-3 border-t border-[rgba(39,39,42,0.3)]">
          <button className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-['Space_Grotesk'] font-bold px-4 py-4 rounded flex items-center justify-center gap-2 transition-colors min-h-[64px]">
            <Power size={20} />
            PARADA DE EMERGENCIA
          </button>
        </div>

        <button
          className="w-full flex items-center gap-3 px-3 py-3 rounded hover:bg-[#1a1a1a] transition-colors"
          onClick={() => navigate("/")}
        >
          <LogOut size={20} className="text-[#52525b]" />
          <span className="text-[#52525b] font-['Space_Grotesk'] text-xs">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
}