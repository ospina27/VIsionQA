import { useState, useEffect, useRef } from "react";
import {
  WifiOff, Wifi, AlertTriangle, ChevronDown, ChevronUp,
  Cloud, CheckCircle, X
} from "lucide-react";
import { useNetworkStatus } from "./NetworkStatus";

export function OfflineBanner() {
  const { isOnline, isSlowConnection, isSyncing } = useNetworkStatus();
  const [showSOP, setShowSOP] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showRestored, setShowRestored] = useState(false);
  // useRef para trackear el valor anterior SIN mutar estado de React
  const prevOnlineRef = useRef(isOnline);

  // Detectar restauración de red para mostrar banner verde breve
  useEffect(() => {
    const wasOffline = !prevOnlineRef.current;
    prevOnlineRef.current = isOnline;

    if (isOnline && wasOffline) {
      setDismissed(false);
      setShowRestored(true);
      const t = setTimeout(() => setShowRestored(false), 4000);
      return () => clearTimeout(t);
    }
  }, [isOnline]);

  // Cuando pierde la red, resetear dismissed para volver a mostrarse
  useEffect(() => {
    if (!isOnline) {
      setDismissed(false);
      setShowRestored(false);
    }
  }, [isOnline]);

  // ── Caso 1: Red restaurada ────────────────────────────────────────────────
  if (showRestored) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-[9999]">
        <div className="bg-[#10b981] border-t-2 border-[#059669] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wifi size={20} className="text-white flex-shrink-0" />
            <div className="flex items-center gap-2">
              <span className="text-white font-['Space_Grotesk'] font-bold text-sm">
                CONEXIÓN RESTAURADA
              </span>
              {isSyncing ? (
                <div className="flex items-center gap-1.5 bg-white/20 px-2 py-0.5 rounded">
                  <Cloud size={12} className="text-white animate-pulse" />
                  <span className="text-white font-['Inter'] text-xs">Sincronizando datos...</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 bg-white/20 px-2 py-0.5 rounded">
                  <CheckCircle size={12} className="text-white" />
                  <span className="text-white font-['Inter'] text-xs">Datos sincronizados</span>
                </div>
              )}
            </div>
          </div>
          <button onClick={() => setShowRestored(false)} className="p-1 hover:bg-white/20 rounded transition-colors">
            <X size={16} className="text-white" />
          </button>
        </div>
      </div>
    );
  }

  // ── Nada que mostrar ──────────────────────────────────────────────────────
  if ((isOnline && !isSlowConnection) || dismissed) return null;

  const isOffline = !isOnline;

  const sopOffline = [
    "✅ LA INSPECCIÓN CONTINÚA — YOLOv8 funciona 100% sin internet.",
    "📊 Los datos se guardan localmente en esta tablet de forma automática.",
    "🔌 Verificar cable de red: conectado firmemente al panel trasero.",
    "🔄 Reiniciar router industrial: botón rojo en rack eléctrico (esperar 30s).",
    "⏳ Si no se restaura en 10 min, llamar a IT: Ext. 4420.",
    "🔃 Al volver la conexión, los datos se sincronizan automáticamente.",
  ];

  const sopSlow = [
    "⚠️ Conexión degradada detectada — precaución activada.",
    "💾 Los datos se guardan localmente como medida de precaución.",
    "📡 Verificar señal WiFi: alejarse de equipos que puedan interferir.",
    "🔄 Si persiste, conectar cable de red como alternativa.",
    "✅ La inspección NO se ve afectada — continúe operando normalmente.",
  ];

  const sop = isOffline ? sopOffline : sopSlow;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999]">
      {/* ── Barra principal ── */}
      <div className={`${
        isOffline
          ? "bg-[#1a0000] border-t-2 border-[#ef4444]"
          : "bg-[#1a1400] border-t-2 border-[#f59e0b]"
      } px-4 py-3`}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {isOffline
              ? <WifiOff size={20} className="text-[#ef4444] flex-shrink-0 animate-pulse" />
              : <AlertTriangle size={20} className="text-[#f59e0b] flex-shrink-0 animate-pulse" />
            }
            <div className="min-w-0">
              <span className={`font-['Space_Grotesk'] font-bold text-sm ${
                isOffline ? "text-[#ef4444]" : "text-[#f59e0b]"
              }`}>
                {isOffline ? "⚡ SIN CONEXIÓN — MODO OFFLINE ACTIVO" : "⚠️ CONEXIÓN LENTA DETECTADA"}
              </span>
              <span className="hidden md:inline text-[#a1a1aa] font-['Inter'] text-xs ml-3">
                {isOffline
                  ? "La inspección continúa. Datos guardados localmente. Se sincronizarán al restaurar red."
                  : "Precaución activada. Guardando datos localmente por seguridad."
                }
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setShowSOP(!showSOP)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded font-['Space_Grotesk'] font-bold text-xs transition-colors min-h-[40px] ${
                isOffline
                  ? "bg-[#ef4444]/20 hover:bg-[#ef4444]/30 text-[#ef4444] border border-[#ef4444]/30"
                  : "bg-[#f59e0b]/20 hover:bg-[#f59e0b]/30 text-[#f59e0b] border border-[#f59e0b]/30"
              }`}
            >
              {showSOP ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
              VER SOP
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="p-2 hover:bg-white/10 rounded transition-colors"
              title="Ocultar"
            >
              <X size={16} className="text-[#71717a]" />
            </button>
          </div>
        </div>

        {/* ── Panel SOP expandible ── */}
        {showSOP && (
          <div className={`mt-3 pt-3 border-t ${
            isOffline ? "border-[#ef4444]/20" : "border-[#f59e0b]/20"
          }`}>
            <div className="text-[#71717a] font-['Space_Grotesk'] font-bold text-[10px] uppercase tracking-wider mb-2">
              {isOffline ? "SOP-RED-02: Fallo de Red" : "SOP-RED-03: Conexión Degradada"}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1.5">
              {sop.map((step, i) => (
                <div key={i} className="flex items-start gap-2 bg-white/5 rounded px-3 py-2">
                  <span className={`font-['Liberation_Mono'] font-bold text-[10px] flex-shrink-0 mt-0.5 ${
                    isOffline ? "text-[#ef4444]" : "text-[#f59e0b]"
                  }`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[#d4d4d8] font-['Inter'] text-xs leading-relaxed">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}