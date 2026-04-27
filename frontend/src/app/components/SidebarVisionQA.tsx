import { useNavigate } from "react-router";
import {
  Camera, FileText, AlertTriangle, Settings,
  Power,
} from "lucide-react";
import { useModal } from "../contexts/ModalContext";
import { useInspectionFlow } from "../contexts/InspectionFlowContext";
import { useAuth } from "../contexts/AuthContext";
import { useRegistros } from "../context/RegistrosContext";

interface SidebarVisionQAProps {
  active: "transmision" | "criterios" | "reportes" | "sistema";
}

export function SidebarVisionQA({ active }: SidebarVisionQAProps) {
  const navigate   = useNavigate();
  const { showConfirm, showAlert } = useModal();
  const { flowState, completeInspection, loteData, startLogin } = useInspectionFlow();
  const { user, logout, isAdmin, isOperario, canAccessTransmision, canAccessReportes, canAccessSistema } = useAuth();
  const { agregarRegistro } = useRegistros();

  // Filtrar pestañas principales según permisos
  const allMainItems = [
    { id: "transmision", label: "Transmisión en Vivo", icon: Camera,    path: "/dashboard",  requirePermission: canAccessTransmision },
    { id: "reportes",    label: "Reportes",            icon: FileText,  path: "/reportes",   requirePermission: canAccessReportes     },
    { id: "sistema",     label: "Sistema",             icon: Settings,  path: "/admin",      requirePermission: canAccessSistema      },
  ];

  const mainItems = allMainItems.filter(item => item.requirePermission());

  // ── Tooltip ──────────────────────────────────────────────────────────────
  const tooltip = (label: string, danger = false) => (
    <div className={`
      xl:hidden absolute left-full ml-3 top-1/2 -translate-y-1/2
      ${danger ? "bg-[#dc2626] border-red-700" : "bg-[#1e1e1e] border-gray-700"}
      border text-white text-xs font-['Space_Grotesk'] font-bold
      px-3 py-2 rounded-lg whitespace-nowrap
      opacity-0 group-hover:opacity-100
      pointer-events-none transition-opacity duration-150 z-50 shadow-lg
    `}>
      {label}
    </div>
  );

  // ── FINALIZAR TURNO ──────────────────────────────────────────────────────
  const handleFinalizarTurno = async () => {
    let savedFlowState: string | null = null;
    try {
      savedFlowState = localStorage.getItem("visionqa_flowState");
    } catch (e) { /* noop */ }
    
    const isInspecting = flowState === "INSPECTING" || savedFlowState === "INSPECTING";

    if (isInspecting) {
      await showAlert({
        title: "INSPECCIÓN EN CURSO",
        message: "No puede finalizar el turno mientras hay una inspección activa.",
        detail: "Detenga la inspección usando el botón PARAR del panel lateral antes de finalizar el turno.",
        type: "warning",
      });
      return;
    }

    const ok = await showConfirm({
      title: "🏁 FINALIZAR TURNO",
      message: "Finalizar turno y cerrar sesión del operario activo.",
      detail: "Se cerrará el turno y regresará al inicio de sesión.",
      type: "warning",
      confirmText: "SÍ, FINALIZAR TURNO",
      cancelText: "CANCELAR",
    });

    if (!ok) return;

    logout();
    startLogin();
    try {
      localStorage.removeItem("visionqa_inspection_total");
      localStorage.removeItem("visionqa_inspection_defectos");
      sessionStorage.removeItem("visionqa_inspection_session");
    } catch (e) { /* noop */ }
    navigate("/");
  };

  // ── CERRAR SESIÓN ────────────────────────────────────────────────────────
  const handleLogout = async () => {
    if (flowState === "INSPECTING") {
      await showAlert({
        title: "INSPECCIÓN EN CURSO",
        message: "No puede cerrar sesión mientras hay una inspección activa.",
        detail: "Detenga la inspección usando el botón PARAR antes de cerrar sesión.",
        type: "warning",
      });
      return;
    }

    const ok = await showConfirm({
      title: "¿CERRAR SESIÓN?",
      message: `Desea cerrar la sesión de ${user?.nombre ?? "este operario"}?`,
      detail: "El estado del flujo se reiniciará. Deberá volver a autenticarse para continuar.",
      type: "warning",
      confirmText: "SÍ, CERRAR SESIÓN",
      cancelText: "CANCELAR",
    });

    if (!ok) return;

    agregarRegistro({
      tipo: "LOGOUT",
      operario: user?.nombre ?? "OPERARIO",
      descripcion: `👋 Cierre de sesión. Operario: ${user?.nombre ?? "N/A"} (${user?.legajo ?? ""})`,
    });

    logout();
    startLogin();
    try {
      localStorage.removeItem("visionqa_inspection_total");
      localStorage.removeItem("visionqa_inspection_defectos");
      sessionStorage.removeItem("visionqa_inspection_session");
    } catch (e) { /* noop */ }
    navigate("/");
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="
      fixed left-0 top-0 bottom-0 z-40
      flex flex-col
      bg-[#0e0e0e] border-r border-[rgba(39,39,42,0.4)]
      w-16 xl:w-56
      transition-all duration-300
      pt-14 xl:pt-16
    ">
      {/* ── Nav principal ── */}
      <nav className="flex-1 flex flex-col justify-around px-2 py-4">
        {mainItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              title={item.label}
              className={`
                group w-full flex items-center gap-3 rounded
                transition-all duration-150 relative
                px-3 py-0
                min-h-[64px]
                ${isActive
                  ? "bg-[#1e3a8a] border-l-[3px] border-[#3b82f6] shadow-[0_0_18px_rgba(59,130,246,0.25)]"
                  : "hover:bg-[#1a1a1a] border-l-[3px] border-transparent"
                }
              `}
            >
              <Icon
                size={24}
                className={`
                  flex-shrink-0 transition-colors
                  ${isActive
                    ? "text-[#3b82f6] drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]"
                    : "text-[#71717a] group-hover:text-[#a1a1aa]"
                  }
                `}
              />
              <span className={`
                hidden xl:block font-['Space_Grotesk'] text-sm truncate
                ${isActive ? "text-white font-bold" : "text-[#71717a] font-medium group-hover:text-[#a1a1aa]"}
              `}>
                {item.label}
              </span>
              {tooltip(item.label)}
              {isActive && (
                <div className="hidden xl:block absolute right-3 w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Sección inferior ── */}
      <div className="px-2 pb-3 pt-2 border-t border-[rgba(39,39,42,0.3)] flex flex-col gap-1">

        {isAdmin() && (
          <button
            key="alertas"
            title="Alertas"
            onClick={() => navigate("/alertas")}
            className="group w-full flex items-center gap-3 px-3 rounded hover:bg-[#1a1a1a] transition-colors min-h-[48px] relative border-l-[3px] border-transparent"
          >
            <AlertTriangle size={20} className="flex-shrink-0 text-[#a1a1aa]" />
            <span className="hidden xl:block font-['Space_Grotesk'] text-xs text-[#a1a1aa]">
              Alertas
            </span>
            {tooltip("Alertas")}
          </button>
        )}

        {/* ── Finalizar Turno ── */}
        <button
          onClick={handleFinalizarTurno}
          title="Finalizar Turno"
          className="group w-full bg-[#3b82f6] hover:bg-[#2563eb] active:bg-[#1d4ed8] text-white font-['Space_Grotesk'] font-bold rounded flex items-center justify-center gap-2 transition-colors min-h-[56px] px-3 relative mt-1 shadow-[0_0_12px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
        >
          <Power size={20} className="flex-shrink-0" />
          <span className="hidden xl:block text-sm tracking-wide">FINALIZAR TURNO</span>
          {tooltip("FINALIZAR TURNO", false)}
        </button>
      </div>
    </div>
  );
}