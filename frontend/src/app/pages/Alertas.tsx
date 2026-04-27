import { useState, useEffect } from "react";
import { SidebarVisionQA } from "../components/SidebarVisionQA";
import { useRegistros } from "../context/RegistrosContext";
import { useConfiguracion } from "../contexts/ConfiguracionContext";
import { 
  CheckCircle, 
  X,
  FileText
} from "lucide-react";

type AlertPriority = "CRÍTICA" | "ALTA" | "MEDIA" | "BAJA";
type AlertStatus = "ACTIVA" | "EN_PROCESO" | "RESUELTA" | "ESCALADA";

interface Alert {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: AlertPriority;
  status: AlertStatus;
  timestamp: Date;
  sop: string[];
  actions: string[];
}

export function Alertas() {
  const { registros } = useRegistros();
  const { config } = useConfiguracion();
  
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [showSOP, setShowSOP] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  const [, setTick] = useState(0);

  const rawNotificaciones = registros.filter(r => r.tipo === 'NOTIFICACION_SUPERVISOR');

  const sortedNotificaciones = [...rawNotificaciones].sort((a: any, b: any) => {
    const aMin = Math.floor((Date.now() - new Date(a.timestamp).getTime()) / 60000);
    const bMin = Math.floor((Date.now() - new Date(b.timestamp).getTime()) / 60000);
    
    const aEscalada = !a.resuelta && aMin > (config?.tiempoLimiteRespuestaAlerta ?? 10);
    const bEscalada = !b.resuelta && bMin > (config?.tiempoLimiteRespuestaAlerta ?? 10);

    if (aEscalada && !bEscalada) return -1;
    if (!aEscalada && bEscalada) return 1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  const activeCount = rawNotificaciones.filter((a: any) => !a.resuelta).length;

  const handleResolve = (alertId: string) => {
    // Maintain mock function for the existing SOP modal if it ever gets triggered
    setSelectedAlert(null);
    setShowSOP(false);
  };

  const getBadgeClass = (tipo: string | undefined) => {
    if (tipo === 'PARADA_EMERGENCIA') return "bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30";
    if (tipo === 'PARADA_NORMAL') return "bg-[#3b82f6]/20 text-[#3b82f6] border border-[#3b82f6]/30";
    if (tipo === 'PAUSA') return "bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30";
    if (tipo === 'RECALIBRACION') return "bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/30";
    return "bg-gray-800 text-gray-300";
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <SidebarVisionQA active="transmision" />
      
      <div className="flex-1 flex flex-col ml-16 xl:ml-56 pt-14 xl:pt-16">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 h-16 backdrop-blur-xl bg-[rgba(10,10,10,0.8)] border-b-2 border-[rgba(127,29,29,0.3)] shadow-[0px_0px_30px_0px_rgba(255,59,48,0.2)] flex items-center justify-between px-6 z-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-white font-['Space_Grotesk'] font-bold text-lg">
                VisionQA
              </div>
              <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] rounded-sm px-2 py-0.5">
                <div className="text-[#ef4444] font-['Inter'] font-bold text-[10px]">
                  SISTEMA_DE_ALERTAS
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-[#71717a] font-['Space_Grotesk'] text-sm">
              {activeCount} ALERTAS ACTIVAS
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">

          {/* ALERTAS ACTIVAS Section */}
          <div className="bg-[#1a1a1a] border-t-4 border-t-[#3b82f6] rounded-b-lg shadow-lg p-6">
            <h2 className="text-white font-['Space_Grotesk'] font-bold text-xl xl:text-2xl mb-4 uppercase tracking-wider">
              ALERTAS ACTIVAS
            </h2>
            
            {sortedNotificaciones.length === 0 ? (
              <div className="text-[#71717a] font-['Inter'] text-center text-sm py-8 italic bg-[#222] rounded-lg border border-gray-800">
                Sin paradas en este turno
              </div>
            ) : (
              <div className="space-y-4">
                {sortedNotificaciones.map((notif: any) => {
                  const minutosTranscurridos = Math.floor(
                    (Date.now() - new Date(notif.timestamp).getTime()) / 60000
                  );
                  const esEscalada = !notif.resuelta && minutosTranscurridos > (config?.tiempoLimiteRespuestaAlerta ?? 10);

                  return (
                    <div key={notif.id} className="space-y-1 mb-4">
                      {/* CASILLA 1 - ALERTA GENERADA */}
                      <div className="bg-[#2a0a0a] border border-[#ef4444]/40 rounded-lg p-4">
                        <div className="text-[#ef4444] font-bold text-xs mb-3">
                          ⚠ ALERTA GENERADA
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-start justify-between gap-4">
                            <span className={`px-2.5 py-1 rounded text-[10px] font-bold font-['Space_Grotesk'] uppercase tracking-wider ${getBadgeClass(notif.paradaTipo)}`}>
                              {notif.paradaTipo?.replace('_', ' ')}
                            </span>
                            <div className="font-['Liberation_Mono'] text-xs text-[#52525b]">
                              {notif.hora || new Date(notif.timestamp).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                          <div className="text-xs text-[#71717a] mt-1">
                            {notif.operario} {notif.loteRelacionado ? `• Lote ${notif.loteRelacionado}` : ''}
                          </div>
                          <div className="text-sm text-[#a1a1aa]">
                            {notif.causa || notif.descripcion}
                          </div>
                        </div>
                      </div>

                      {/* CASILLA 2 - NOTIFICACIÓN DE SOLUCIÓN */}
                      {notif.resuelta ? (
                        <div className="bg-[#0a2a1a] border border-[#10b981]/40 rounded-lg p-4">
                          <div className="text-[#10b981] font-bold text-xs mb-2">
                            ✓ RESUELTO
                          </div>
                          <div className="text-sm text-[#a1a1aa] mb-1">
                            {notif.resolucion || "Emergencia resuelta por el operario"}
                          </div>
                          {notif.horaResolucion && (
                            <div className="font-['Liberation_Mono'] text-xs text-[#52525b]">
                              {notif.horaResolucion}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className={`rounded-lg p-4 ${esEscalada ? "bg-[#1a1a1a] border border-[#ef4444] animate-pulse" : "bg-[#1a1a1a] border border-[#3f3f46]"}`}>
                          <div className={`font-bold text-xs mb-2 ${esEscalada ? "text-[#ef4444]" : "text-[#f59e0b]"}`}>
                            {esEscalada ? "🔴 CRÍTICA — TIEMPO EXCEDIDO" : "⏳ PENDIENTE DE RESOLUCIÓN"}
                          </div>
                          {esEscalada ? (
                            <div className="text-sm text-[#a1a1aa]">
                              Lleva {minutosTranscurridos} min sin resolverse
                            </div>
                          ) : (
                            config?.tiempoLimiteRespuestaAlerta && (
                              <div className="text-xs text-[#71717a]">
                                Tiempo límite: {config.tiempoLimiteRespuestaAlerta} min
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SOP Modal */}
      {showSOP && selectedAlert && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-[#1a1a1a] border-2 border-[#ef4444] rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto">
            {/* Header */}
            <div className="bg-[#2a2a2a] px-8 py-6 flex items-center justify-between border-b border-gray-800">
              <div className="flex items-center gap-4">
                <FileText size={32} className="text-[#ef4444]" />
                <div>
                  <h2 className="text-white font-['Space_Grotesk'] font-bold text-2xl">
                    PROCEDIMIENTO OPERATIVO ESTÁNDAR
                  </h2>
                  <p className="text-[#71717a] font-['Inter'] text-sm mt-1">
                    {selectedAlert.type} • {selectedAlert.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSOP(false)}
                className="p-2 hover:bg-gray-800 rounded transition-colors"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            {/* Content */}
            <div className="px-8 py-6 space-y-6">
              {/* Alert Info */}
              <div className="bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)] rounded-lg p-6">
                <h3 className="text-white font-['Space_Grotesk'] font-bold text-lg mb-2">
                  {selectedAlert.title}
                </h3>
                <p className="text-[#a1a1aa] font-['Inter'] text-base">
                  {selectedAlert.description}
                </p>
              </div>

              {/* SOP Steps */}
              <div>
                <h3 className="text-white font-['Space_Grotesk'] font-bold text-xl mb-4">
                  PASOS A SEGUIR:
                </h3>
                <div className="space-y-3">
                  {selectedAlert.sop.map((step: string, idx: number) => (
                    <div key={idx} className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-5 flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ef4444] flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{idx + 1}</span>
                      </div>
                      <p className="text-[#d4d4d8] font-['Inter'] text-base leading-relaxed flex-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => handleResolve(selectedAlert.id)}
                  className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white font-['Space_Grotesk'] font-bold px-6 py-5 rounded flex items-center justify-center gap-2 transition-colors min-h-[64px]"
                >
                  <CheckCircle size={20} />
                  PROCEDIMIENTO COMPLETADO
                </button>
                <button
                  onClick={() => setShowSOP(false)}
                  className="px-8 py-5 bg-gray-800 hover:bg-gray-700 text-white font-['Space_Grotesk'] font-bold rounded transition-colors min-h-[64px]"
                >
                  CERRAR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
