import { useState } from "react";
import { useNavigate } from "react-router";
import { SidebarVisionQA } from "../components/SidebarVisionQA";
import { 
  AlertTriangle, 
  Camera, 
  Wifi, 
  Thermometer, 
  Power, 
  CheckCircle, 
  Clock, 
  AlertOctagon,
  X,
  ArrowRight,
  FileText,
  Shield
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
  const navigate = useNavigate();
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [showSOP, setShowSOP] = useState(false);
  
  // Mock data - En producción vendría de un sistema de monitoreo real
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([
    {
      id: "AL-2024-001",
      type: "LENTE_SUCIO",
      title: "Visión Comprometida Detectada",
      description: "La cámara CAM_04 muestra degradación de imagen por suciedad acumulada",
      priority: "MEDIA",
      status: "ACTIVA",
      timestamp: new Date(Date.now() - 300000), // 5 min ago
      sop: [
        "1. Presionar botón PAUSAR en el dashboard principal",
        "2. Tomar el paño de microfibra del kit de limpieza (cajón derecho)",
        "3. Aplicar 2 gotas de solución limpiadora específica para lentes",
        "4. Limpiar lente en movimientos circulares suaves de adentro hacia afuera",
        "5. Verificar en pantalla que la imagen esté nítida",
        "6. Marcar como RESUELTA y reanudar inspección",
        "7. Si persiste: ESCALAR a mantenimiento técnico"
      ],
      actions: ["PAUSAR_LINEA", "MARCAR_RESUELTA", "ESCALAR_MANTENIMIENTO"]
    },
    {
      id: "AL-2024-002",
      type: "FALLO_RED",
      title: "Conexión de Red Intermitente",
      description: "Pérdida de conectividad con servidor central. Modo offline activado",
      priority: "ALTA",
      status: "EN_PROCESO",
      timestamp: new Date(Date.now() - 120000), // 2 min ago
      sop: [
        "1. VERIFICAR: Cable de red conectado firmemente",
        "2. REINICIAR: Router industrial (botón rojo en rack)",
        "3. ESPERAR: 30 segundos para reconexión automática",
        "4. CONTINUAR: Operación en modo offline está autorizada",
        "5. DATOS: Se sincronizarán automáticamente al restaurar conexión",
        "6. Si no se resuelve en 10 min: Notificar a IT (Ext. 4420)"
      ],
      actions: ["VERIFICAR_CABLE", "REINICIAR_ROUTER", "CONTACTAR_IT"]
    },
    {
      id: "AL-2024-003",
      type: "LOTE_CRITICO",
      title: "⚠️ LOTE CRÍTICAMENTE DAÑADO",
      description: "Lote LT-2024-489 superó el umbral crítico: 3.8% de tasa de defectos (AQL: 1.0%)",
      priority: "CRÍTICA",
      status: "ACTIVA",
      timestamp: new Date(Date.now() - 60000), // 1 min ago
      sop: [
        "1. DETENER: Presionar PARADA DE EMERGENCIA inmediatamente",
        "2. SEGREGAR: Apartar TODO el lote afectado en área de cuarentena amarilla",
        "3. ETIQUETAR: Colocar etiqueta roja 'NO CONFORME' en contenedores",
        "4. NOTIFICAR: Llamar al Supervisor de Calidad (Ext. 2100) URGENTE",
        "5. DOCUMENTAR: Fotografiar muestras defectuosas con tablet",
        "6. BLOQUEAR: Marcar lote como BLOQUEADO en sistema",
        "7. NO REANUDAR: Esperar autorización escrita del supervisor para continuar",
        "8. ANÁLISIS: Supervisor realizará auditoría de causas raíz"
      ],
      actions: ["DETENER_LINEA", "SEGREGAR_LOTE", "NOTIFICAR_SUPERVISOR", "GENERAR_NC"]
    }
  ]);

  const [alertHistory] = useState<Alert[]>([
    {
      id: "AL-2024-000",
      type: "OBJETO_EXTRAÑO",
      title: "Objeto No Identificado en Línea",
      description: "Sistema detectó elemento metálico en banda transportadora",
      priority: "ALTA",
      status: "RESUELTA",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      sop: [],
      actions: []
    },
    {
      id: "AL-2023-999",
      type: "TEMPERATURA_ANOMALA",
      title: "Temperatura del Sistema Elevada",
      description: "CPU alcanzó 78°C - Ventilación aumentada automáticamente",
      priority: "MEDIA",
      status: "RESUELTA",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      sop: [],
      actions: []
    },
    {
      id: "AL-2023-998",
      type: "OBJETO_EXTRAÑO",
      title: "Objeto Extraño Detectado",
      description: "Pieza metálica detectada en banda - Línea detenida automáticamente",
      priority: "ALTA",
      status: "RESUELTA",
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      sop: [],
      actions: []
    }
  ]);

  const handleResolve = (alertId: string) => {
    setActiveAlerts(alerts => 
      alerts.map(a => a.id === alertId ? { ...a, status: "RESUELTA" as AlertStatus } : a)
    );
    setSelectedAlert(null);
  };

  const handleEscalate = (alertId: string) => {
    setActiveAlerts(alerts => 
      alerts.map(a => a.id === alertId ? { ...a, status: "ESCALADA" as AlertStatus } : a)
    );
    setSelectedAlert(null);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "LENTE_SUCIO": return Camera;
      case "FALLO_RED": return Wifi;
      case "TEMPERATURA_ANOMALA": return Thermometer;
      case "OBJETO_EXTRAÑO": return AlertTriangle;
      case "PARADA_EMERGENCIA": return Power;
      default: return AlertOctagon;
    }
  };

  const getPriorityColor = (priority: AlertPriority) => {
    switch (priority) {
      case "CRÍTICA": return "border-[#ef4444] bg-[#ef4444]/10";
      case "ALTA": return "border-[#f59e0b] bg-[#f59e0b]/10";
      case "MEDIA": return "border-[#f1c100] bg-[#f1c100]/10";
      case "BAJA": return "border-[#3b82f6] bg-[#3b82f6]/10";
    }
  };

  const getStatusColor = (status: AlertStatus) => {
    switch (status) {
      case "ACTIVA": return "text-[#ef4444]";
      case "EN_PROCESO": return "text-[#f1c100]";
      case "RESUELTA": return "text-[#10b981]";
      case "ESCALADA": return "text-[#f59e0b]";
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <SidebarVisionQA active="transmision" />
      
      <div className="flex-1 flex flex-col ml-64 pt-16">
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
              {activeAlerts.filter(a => a.status === "ACTIVA").length} ALERTAS ACTIVAS
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Emergency Actions Strip */}
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#ef4444]/30 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Shield size={32} className="text-[#ef4444]" />
                <div>
                  <h3 className="text-white font-['Space_Grotesk'] font-bold text-xl">
                    ACCIONES DE EMERGENCIA
                  </h3>
                  <p className="text-[#71717a] font-['Inter'] text-sm mt-1">
                    Controles críticos de sistema disponibles 24/7
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-[#ef4444] hover:bg-[#dc2626] text-white font-['Space_Grotesk'] font-bold px-8 py-4 rounded flex items-center gap-2 transition-colors min-h-[64px]"
              >
                <Power size={20} />
                PARADA DE EMERGENCIA
              </button>
            </div>
          </div>

          {/* Active Alerts Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-['Space_Grotesk'] font-bold text-2xl">
                ALERTAS ACTIVAS
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
                <span className="text-[#71717a] font-['Space_Grotesk'] text-sm">
                  Monitoreo en Tiempo Real
                </span>
              </div>
            </div>

            {activeAlerts.filter(a => a.status !== "RESUELTA").length === 0 ? (
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-12 text-center">
                <CheckCircle size={48} className="text-[#10b981] mx-auto mb-4" />
                <h3 className="text-[#10b981] font-['Space_Grotesk'] font-bold text-xl mb-2">
                  SISTEMA OPERANDO NORMALMENTE
                </h3>
                <p className="text-[#71717a] font-['Inter'] text-base">
                  No hay alertas activas en este momento
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {activeAlerts
                  .filter(a => a.status !== "RESUELTA")
                  .map((alert) => {
                    const Icon = getAlertIcon(alert.type);
                    return (
                      <div
                        key={alert.id}
                        className={`bg-[#1a1a1a] border-2 rounded-lg p-6 ${getPriorityColor(alert.priority)}`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-lg ${
                              alert.priority === "CRÍTICA" ? "bg-[#ef4444]/20" :
                              alert.priority === "ALTA" ? "bg-[#f59e0b]/20" :
                              "bg-[#f1c100]/20"
                            }`}>
                              <Icon size={28} className={
                                alert.priority === "CRÍTICA" ? "text-[#ef4444]" :
                                alert.priority === "ALTA" ? "text-[#f59e0b]" :
                                "text-[#f1c100]"
                              } />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-white font-['Space_Grotesk'] font-bold text-lg">
                                  {alert.title}
                                </h3>
                                <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                                  alert.priority === "CRÍTICA" ? "bg-[#ef4444] text-white" :
                                  alert.priority === "ALTA" ? "bg-[#f59e0b] text-white" :
                                  "bg-[#f1c100] text-black"
                                }`}>
                                  {alert.priority}
                                </span>
                                <span className={`px-2 py-1 rounded text-[10px] font-bold ${getStatusColor(alert.status)}`}>
                                  {alert.status}
                                </span>
                              </div>
                              <p className="text-[#a1a1aa] font-['Inter'] text-sm mb-3">
                                {alert.description}
                              </p>
                              <div className="flex items-center gap-2 text-[#71717a] text-xs">
                                <Clock size={14} />
                                <span>ID: {alert.id} • Hace {Math.floor((Date.now() - alert.timestamp.getTime()) / 60000)} minutos</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-800">
                          <button
                            onClick={() => {
                              setSelectedAlert(alert);
                              setShowSOP(true);
                            }}
                            className="flex-1 bg-[#353534] hover:bg-[#3d3c3b] border border-[#5d3f3b] text-white font-['Space_Grotesk'] font-bold px-6 py-4 rounded flex items-center justify-center gap-2 transition-colors min-h-[64px]"
                          >
                            <FileText size={20} />
                            VER PROCEDIMIENTO (SOP)
                          </button>
                          <button
                            onClick={() => handleResolve(alert.id)}
                            className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white font-['Space_Grotesk'] font-bold px-6 py-4 rounded flex items-center justify-center gap-2 transition-colors min-h-[64px]"
                          >
                            <CheckCircle size={20} />
                            MARCAR COMO RESUELTA
                          </button>
                          <button
                            onClick={() => handleEscalate(alert.id)}
                            className="flex-1 bg-[#f59e0b] hover:bg-[#d97706] text-white font-['Space_Grotesk'] font-bold px-6 py-4 rounded flex items-center justify-center gap-2 transition-colors min-h-[64px]"
                          >
                            <ArrowRight size={20} />
                            ESCALAR A SUPERVISOR
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Alert History */}
          <div className="space-y-4">
            <h2 className="text-white font-['Space_Grotesk'] font-bold text-2xl">
              HISTORIAL DEL TURNO
            </h2>
            
            <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#2a2a2a]">
                  <tr>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">ID</th>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Tipo</th>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Descripción</th>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Prioridad</th>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Estado</th>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Hora</th>
                  </tr>
                </thead>
                <tbody>
                  {[...activeAlerts.filter(a => a.status === "RESUELTA"), ...alertHistory].map((alert, idx) => (
                    <tr key={alert.id} className={idx % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#1f1f1f]"}>
                      <td className="px-6 py-4 text-[#d4d4d8] font-['Liberation_Mono'] text-sm">{alert.id}</td>
                      <td className="px-6 py-4 text-[#a1a1aa] font-['Inter'] text-sm">{alert.type}</td>
                      <td className="px-6 py-4 text-[#a1a1aa] font-['Inter'] text-sm">{alert.title}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                          alert.priority === "CRÍTICA" ? "bg-[#ef4444]/20 text-[#ef4444]" :
                          alert.priority === "ALTA" ? "bg-[#f59e0b]/20 text-[#f59e0b]" :
                          "bg-[#f1c100]/20 text-[#f1c100]"
                        }`}>
                          {alert.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-['Space_Grotesk'] font-bold text-xs ${getStatusColor(alert.status)}`}>
                          {alert.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#71717a] font-['Liberation_Mono'] text-xs">
                        {alert.timestamp.toLocaleTimeString('es-AR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
                  {selectedAlert.sop.map((step, idx) => (
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
                  onClick={() => {
                    handleResolve(selectedAlert.id);
                    setShowSOP(false);
                  }}
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