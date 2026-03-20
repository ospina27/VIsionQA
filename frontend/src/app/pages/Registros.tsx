import { useState } from "react";
import { SidebarVisionQA } from "../components/SidebarVisionQA";
import {
  ClipboardList,
  User,
  Package,
  Settings,
  Clock,
  Search,
  Download,
  Eye,
  Shield,
  Activity,
  Calendar,
  Filter
} from "lucide-react";

type Tab = "ACTIVIDADES" | "LOTES" | "OPERARIOS" | "CALIBRACIONES" | "CONFIGURACION";

interface RegistroActividad {
  id: string;
  timestamp: Date;
  tipo: "INICIO_LOTE" | "FIN_LOTE" | "PAUSA" | "ALERTA" | "CALIBRACION" | "CONFIGURACION" | "LOGIN" | "LOGOUT";
  operario: string;
  descripcion: string;
  loteRelacionado?: string;
}

export function Registros() {
  const [activeTab, setActiveTab] = useState<Tab>("ACTIVIDADES");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("HOY");

  // Mock data - En producción viene de base de datos auditada
  const actividadesRecientes: RegistroActividad[] = [
    {
      id: "ACT-2024-3421",
      timestamp: new Date(Date.now() - 600000), // 10 min ago
      tipo: "ALERTA",
      operario: "Carlos Rodríguez - LEG-4482",
      descripcion: "Alerta de lente sucio resuelta. Limpieza realizada según SOP-CAM-01",
      loteRelacionado: "LT-2024-492"
    },
    {
      id: "ACT-2024-3420",
      timestamp: new Date(Date.now() - 1800000), // 30 min ago
      tipo: "FIN_LOTE",
      operario: "Carlos Rodríguez - LEG-4482",
      descripcion: "Lote LT-2024-491 finalizado. Estado: APROBADO (0.61% defectos)",
      loteRelacionado: "LT-2024-491"
    },
    {
      id: "ACT-2024-3419",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      tipo: "INICIO_LOTE",
      operario: "Carlos Rodríguez - LEG-4482",
      descripcion: "Inicio de inspección lote LT-2024-491 - Proveedor: PLASTICOS_DEL_SUR",
      loteRelacionado: "LT-2024-491"
    },
    {
      id: "ACT-2024-3418",
      timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
      tipo: "PAUSA",
      operario: "Carlos Rodríguez - LEG-4482",
      descripcion: "Pausa programada de 15 minutos activada"
    },
    {
      id: "ACT-2024-3417",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      tipo: "FIN_LOTE",
      operario: "Carlos Rodríguez - LEG-4482",
      descripcion: "Lote LT-2024-490 finalizado. Estado: APROBADO (0.71% defectos)",
      loteRelacionado: "LT-2024-490"
    },
    {
      id: "ACT-2024-3416",
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      tipo: "ALERTA",
      operario: "Carlos Rodríguez - LEG-4482",
      descripcion: "⚠️ ALERTA CRÍTICA: Lote LT-2024-489 rechazado por superar AQL (3.8% defectos)",
      loteRelacionado: "LT-2024-489"
    },
    {
      id: "ACT-2024-3415",
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      tipo: "CALIBRACION",
      operario: "Técnico Mantenimiento - Jorge Silva",
      descripcion: "Calibración de cámara CAM_04 completada. Certificado: CAL-2024-189"
    },
    {
      id: "ACT-2024-3414",
      timestamp: new Date(Date.now() - 21600000), // 6 hours ago
      tipo: "CONFIGURACION",
      operario: "Supervisor - María González",
      descripcion: "Actualización de umbral de confianza YOLO: 82% → 85%"
    },
    {
      id: "ACT-2024-3413",
      timestamp: new Date(Date.now() - 28800000), // 8 hours ago
      tipo: "LOGIN",
      operario: "Carlos Rodríguez - LEG-4482",
      descripcion: "Inicio de turno mediante PIN. Estación: ESTACIÓN_04"
    }
  ];

  const lotesHistorial = [
    {
      id: "LT-2024-492",
      proveedor: "INDUSTRIAS_CRESPO",
      operario: "Carlos Rodríguez",
      inicio: "12:25",
      fin: "13:45",
      unidades: 1650,
      defectos: 8,
      estado: "APROBADO",
      certificado: "CERT-2024-492"
    },
    {
      id: "LT-2024-491",
      proveedor: "PLASTICOS_DEL_SUR",
      operario: "Carlos Rodríguez",
      inicio: "10:35",
      fin: "12:10",
      unidades: 1980,
      defectos: 12,
      estado: "APROBADO",
      certificado: "CERT-2024-491"
    },
    {
      id: "LT-2024-490",
      proveedor: "ENVASES_NORTE_SA",
      operario: "Carlos Rodríguez",
      inicio: "08:45",
      fin: "10:20",
      unidades: 2100,
      defectos: 15,
      estado: "APROBADO",
      certificado: "CERT-2024-490"
    },
    {
      id: "LT-2024-489",
      proveedor: "PLASTICOS_DEL_SUR",
      operario: "Carlos Rodríguez",
      inicio: "06:15",
      fin: "08:30",
      unidades: 2500,
      defectos: 95,
      estado: "RECHAZADO",
      certificado: "NC-2024-489"
    }
  ];

  const operariosActividad = [
    {
      legajo: "LEG-4482",
      nombre: "Carlos Rodríguez",
      turno: "TURNO_A (06:00 - 14:00)",
      horasActivas: "7h 45min",
      lotesCompletados: 4,
      alertasResueltas: 8,
      ultimaActividad: "Hace 10 minutos"
    },
    {
      legajo: "LEG-3301",
      nombre: "Jorge Silva",
      rol: "Técnico Mantenimiento",
      turno: "TURNO_A (06:00 - 14:00)",
      horasActivas: "2h 15min",
      calibraciones: 3,
      ultimaActividad: "Hace 4 horas"
    },
    {
      legajo: "LEG-2104",
      nombre: "María González",
      rol: "Supervisor de Calidad",
      turno: "TURNO_A (06:00 - 14:00)",
      horasActivas: "8h 00min",
      autorizaciones: 5,
      ultimaActividad: "Hace 6 horas"
    }
  ];

  const calibracionesLog = [
    {
      id: "CAL-2024-189",
      fecha: "19 MAR 2026 10:15",
      dispositivo: "CAM_04 (Cámara Principal)",
      tecnico: "Jorge Silva - LEG-3301",
      tipo: "CALIBRACIÓN_ÓPTICA",
      resultado: "APROBADO",
      proximaCalib: "26 MAR 2026"
    },
    {
      id: "CAL-2024-188",
      fecha: "18 MAR 2026 14:30",
      dispositivo: "ILUMINACIÓN_LED",
      tecnico: "Jorge Silva - LEG-3301",
      tipo: "VERIFICACIÓN_LUMÍNICA",
      resultado: "APROBADO",
      proximaCalib: "25 MAR 2026"
    },
    {
      id: "CAL-2024-187",
      fecha: "17 MAR 2026 09:00",
      dispositivo: "BANDA_TRANSPORTADORA",
      tecnico: "Pedro Martínez - LEG-5521",
      tipo: "VELOCIDAD_Y_ALINEACIÓN",
      resultado: "APROBADO",
      proximaCalib: "24 MAR 2026"
    }
  ];

  const cambiosConfiguracion = [
    {
      id: "CFG-2024-089",
      fecha: "19 MAR 2026 08:45",
      usuario: "María González - Supervisor",
      parametro: "UMBRAL_CONFIANZA_YOLO",
      valorAnterior: "82%",
      valorNuevo: "85%",
      razon: "Reducir falsos positivos en QUEMADURA_TÉRMICA"
    },
    {
      id: "CFG-2024-088",
      fecha: "18 MAR 2026 16:20",
      usuario: "María González - Supervisor",
      parametro: "AQL_CRITICO",
      valorAnterior: "2.5%",
      valorNuevo: "2.5%",
      razon: "Verificación periódica (sin cambios)"
    },
    {
      id: "CFG-2024-087",
      fecha: "17 MAR 2026 11:10",
      usuario: "Admin Sistema",
      parametro: "VELOCIDAD_BANDA",
      valorAnterior: "120 unid/min",
      valorNuevo: "115 unid/min",
      razon: "Optimización para reducir motion blur"
    }
  ];

  const tabs = [
    { id: "ACTIVIDADES" as Tab, label: "Registro de Actividades", icon: Activity },
    { id: "LOTES" as Tab, label: "Historial de Lotes", icon: Package },
    { id: "OPERARIOS" as Tab, label: "Operarios Activos", icon: User },
    { id: "CALIBRACIONES" as Tab, label: "Calibraciones", icon: Settings },
    { id: "CONFIGURACION" as Tab, label: "Cambios de Config", icon: Shield }
  ];

  const getTipoIcon = (tipo: RegistroActividad["tipo"]) => {
    switch (tipo) {
      case "INICIO_LOTE": return <Package size={16} className="text-[#10b981]" />;
      case "FIN_LOTE": return <Package size={16} className="text-[#3b82f6]" />;
      case "PAUSA": return <Clock size={16} className="text-[#71717a]" />;
      case "ALERTA": return <Shield size={16} className="text-[#ef4444]" />;
      case "CALIBRACION": return <Settings size={16} className="text-[#f59e0b]" />;
      case "CONFIGURACION": return <Settings size={16} className="text-[#8b5cf6]" />;
      case "LOGIN": return <User size={16} className="text-[#10b981]" />;
      case "LOGOUT": return <User size={16} className="text-[#71717a]" />;
    }
  };

  const getTipoColor = (tipo: RegistroActividad["tipo"]) => {
    switch (tipo) {
      case "INICIO_LOTE": return "bg-[#10b981]/20 text-[#10b981] border-[#10b981]";
      case "FIN_LOTE": return "bg-[#3b82f6]/20 text-[#3b82f6] border-[#3b82f6]";
      case "PAUSA": return "bg-[#71717a]/20 text-[#71717a] border-[#71717a]";
      case "ALERTA": return "bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]";
      case "CALIBRACION": return "bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]";
      case "CONFIGURACION": return "bg-[#8b5cf6]/20 text-[#8b5cf6] border-[#8b5cf6]";
      case "LOGIN": return "bg-[#10b981]/20 text-[#10b981] border-[#10b981]";
      case "LOGOUT": return "bg-[#71717a]/20 text-[#71717a] border-[#71717a]";
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <SidebarVisionQA active="transmision" />

      <div className="flex-1 flex flex-col ml-64 pt-16">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 h-16 backdrop-blur-xl bg-[rgba(30,64,175,0.8)] border-b-2 border-[rgba(59,130,246,0.3)] shadow-[0px_0px_30px_0px_rgba(59,130,246,0.2)] flex items-center justify-between px-6 z-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-white font-['Space_Grotesk'] font-bold text-lg">
                VisionQA
              </div>
              <div className="bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)] rounded-sm px-2 py-0.5">
                <div className="text-[#3b82f6] font-['Inter'] font-bold text-[10px]">
                  REGISTROS_Y_TRAZABILIDAD
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-[#71717a] font-['Space_Grotesk'] text-sm">
              <Calendar size={16} />
              {selectedDate}
            </div>
            <button className="flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white font-['Space_Grotesk'] font-bold px-6 py-3 rounded transition-colors">
              <Download size={18} />
              EXPORTAR AUDITORÍA
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-[#1a1a1a] border-b border-gray-800 px-6 py-3">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded font-['Space_Grotesk'] font-bold text-sm transition-all ${
                    isActive
                      ? "bg-[#3b82f6] text-white"
                      : "bg-[#2a2a2a] text-[#71717a] hover:bg-[#3a3a3a]"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* ACTIVIDADES TAB */}
          {activeTab === "ACTIVIDADES" && (
            <>
              {/* Search */}
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-4">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar por operario, lote, descripción..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#2a2a2a] border border-gray-700 text-white pl-12 pr-4 py-3 rounded font-['Inter'] text-sm focus:outline-none focus:border-[#ef4444]"
                    />
                  </div>
                  <button className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-gray-700 text-white px-6 py-3 rounded font-['Space_Grotesk'] font-bold text-sm transition-colors">
                    <Filter size={18} />
                    FILTRAR POR TIPO
                  </button>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-6">
                <h2 className="text-white font-['Space_Grotesk'] font-bold text-2xl mb-6">
                  LÍNEA DE TIEMPO - TURNO ACTUAL
                </h2>

                <div className="space-y-4">
                  {actividadesRecientes
                    .filter(act => 
                      act.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      act.operario.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      act.loteRelacionado?.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((actividad) => (
                      <div key={actividad.id} className="relative pl-8 pb-4 border-l-2 border-gray-700 last:border-l-0">
                        {/* Timeline Dot */}
                        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#ef4444] border-2 border-[#0a0a0a]" />

                        <div className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-5">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className={`px-3 py-1 rounded text-xs font-bold border ${getTipoColor(actividad.tipo)} flex items-center gap-2`}>
                                {getTipoIcon(actividad.tipo)}
                                {actividad.tipo.replace("_", " ")}
                              </span>
                              <span className="text-[#71717a] font-['Liberation_Mono'] text-xs">
                                ID: {actividad.id}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[#a1a1aa] text-sm">
                              <Clock size={14} />
                              {actividad.timestamp.toLocaleTimeString('es-AR')}
                            </div>
                          </div>

                          <p className="text-white font-['Inter'] text-base mb-2">
                            {actividad.descripcion}
                          </p>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-[#71717a]">
                              <User size={14} />
                              {actividad.operario}
                            </div>
                            {actividad.loteRelacionado && (
                              <div className="flex items-center gap-2">
                                <Package size={14} className="text-[#3b82f6]" />
                                <span className="text-[#3b82f6] font-['Liberation_Mono'] font-bold">
                                  {actividad.loteRelacionado}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}

          {/* LOTES TAB */}
          {activeTab === "LOTES" && (
            <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-white font-['Space_Grotesk'] font-bold text-2xl">
                  HISTORIAL COMPLETO DE LOTES
                </h2>
                <p className="text-[#71717a] font-['Inter'] text-sm mt-2">
                  Trazabilidad completa con certificados y evidencia forense
                </p>
              </div>

              <table className="w-full">
                <thead className="bg-[#2a2a2a]">
                  <tr>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">ID Lote</th>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Proveedor</th>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Operario</th>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Horario</th>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Unidades</th>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Estado</th>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Certificado</th>
                  </tr>
                </thead>
                <tbody>
                  {lotesHistorial.map((lote, idx) => (
                    <tr key={lote.id} className={idx % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#1f1f1f]"}>
                      <td className="px-6 py-5 text-white font-['Liberation_Mono'] font-bold">
                        {lote.id}
                      </td>
                      <td className="px-6 py-5 text-[#a1a1aa] font-['Inter']">
                        {lote.proveedor}
                      </td>
                      <td className="px-6 py-5 text-[#a1a1aa] font-['Inter']">
                        {lote.operario}
                      </td>
                      <td className="px-6 py-5 text-[#a1a1aa] font-['Liberation_Mono'] text-sm">
                        {lote.inicio} - {lote.fin}
                      </td>
                      <td className="px-6 py-5 text-white font-['Space_Grotesk'] font-bold">
                        {lote.unidades.toLocaleString()}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded text-xs font-bold ${
                          lote.estado === "APROBADO"
                            ? "bg-[#10b981]/20 text-[#10b981]"
                            : "bg-[#ef4444]/20 text-[#ef4444]"
                        }`}>
                          {lote.estado}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <button className="flex items-center gap-2 text-[#3b82f6] hover:text-[#2563eb] font-['Liberation_Mono'] font-bold text-sm transition-colors">
                          <Eye size={16} />
                          {lote.certificado}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* OPERARIOS TAB */}
          {activeTab === "OPERARIOS" && (
            <div className="grid gap-6">
              {operariosActividad.map((operario) => (
                <div key={operario.legajo} className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-[#ef4444] flex items-center justify-center">
                        <User size={32} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-['Space_Grotesk'] font-bold text-xl">
                          {operario.nombre}
                        </h3>
                        <div className="text-[#71717a] font-['Liberation_Mono'] text-sm">
                          {operario.legajo} {operario.rol && `• ${operario.rol}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#10b981] font-['Space_Grotesk'] font-bold text-sm mb-1">
                        ● ACTIVO
                      </div>
                      <div className="text-[#71717a] text-xs">{operario.ultimaActividad}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-[#2a2a2a] border border-gray-700 rounded p-4">
                      <div className="text-[#71717a] text-xs mb-2">TURNO</div>
                      <div className="text-white font-['Space_Grotesk'] font-bold">
                        {operario.turno}
                      </div>
                    </div>
                    <div className="bg-[#2a2a2a] border border-gray-700 rounded p-4">
                      <div className="text-[#71717a] text-xs mb-2">HORAS ACTIVAS</div>
                      <div className="text-[#10b981] font-['Space_Grotesk'] font-bold text-lg">
                        {operario.horasActivas}
                      </div>
                    </div>
                    {operario.lotesCompletados && (
                      <div className="bg-[#2a2a2a] border border-gray-700 rounded p-4">
                        <div className="text-[#71717a] text-xs mb-2">LOTES COMPLETADOS</div>
                        <div className="text-[#3b82f6] font-['Space_Grotesk'] font-bold text-lg">
                          {operario.lotesCompletados}
                        </div>
                      </div>
                    )}
                    {operario.alertasResueltas && (
                      <div className="bg-[#2a2a2a] border border-gray-700 rounded p-4">
                        <div className="text-[#71717a] text-xs mb-2">ALERTAS RESUELTAS</div>
                        <div className="text-[#f59e0b] font-['Space_Grotesk'] font-bold text-lg">
                          {operario.alertasResueltas}
                        </div>
                      </div>
                    )}
                    {operario.calibraciones && (
                      <div className="bg-[#2a2a2a] border border-gray-700 rounded p-4">
                        <div className="text-[#71717a] text-xs mb-2">CALIBRACIONES</div>
                        <div className="text-[#8b5cf6] font-['Space_Grotesk'] font-bold text-lg">
                          {operario.calibraciones}
                        </div>
                      </div>
                    )}
                    {operario.autorizaciones && (
                      <div className="bg-[#2a2a2a] border border-gray-700 rounded p-4">
                        <div className="text-[#71717a] text-xs mb-2">AUTORIZACIONES</div>
                        <div className="text-[#ef4444] font-['Space_Grotesk'] font-bold text-lg">
                          {operario.autorizaciones}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CALIBRACIONES TAB */}
          {activeTab === "CALIBRACIONES" && (
            <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-white font-['Space_Grotesk'] font-bold text-2xl">
                  REGISTRO DE CALIBRACIONES Y MANTENIMIENTO
                </h2>
                <p className="text-[#71717a] font-['Inter'] text-sm mt-2">
                  Certificados de calibración según normas ISO 9001
                </p>
              </div>

              <table className="w-full">
                <thead className="bg-[#2a2a2a]">
                  <tr>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Certificado</th>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Fecha y Hora</th>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Dispositivo</th>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Técnico</th>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Tipo</th>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Resultado</th>
                    <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Próxima</th>
                  </tr>
                </thead>
                <tbody>
                  {calibracionesLog.map((cal, idx) => (
                    <tr key={cal.id} className={idx % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#1f1f1f]"}>
                      <td className="px-6 py-5 text-[#f59e0b] font-['Liberation_Mono'] font-bold">
                        {cal.id}
                      </td>
                      <td className="px-6 py-5 text-[#a1a1aa] font-['Liberation_Mono'] text-sm">
                        {cal.fecha}
                      </td>
                      <td className="px-6 py-5 text-white font-['Space_Grotesk'] font-bold">
                        {cal.dispositivo}
                      </td>
                      <td className="px-6 py-5 text-[#a1a1aa] font-['Inter']">
                        {cal.tecnico}
                      </td>
                      <td className="px-6 py-5 text-[#71717a] font-['Inter'] text-sm">
                        {cal.tipo}
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 rounded text-xs font-bold bg-[#10b981]/20 text-[#10b981]">
                          {cal.resultado}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-[#71717a] font-['Liberation_Mono'] text-sm">
                        {cal.proximaCalib}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* CONFIGURACION TAB */}
          {activeTab === "CONFIGURACION" && (
            <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-700 flex items-center gap-4">
                <Shield size={32} className="text-[#8b5cf6]" />
                <div>
                  <h2 className="text-white font-['Space_Grotesk'] font-bold text-2xl">
                    AUDITORÍA DE CAMBIOS DE CONFIGURACIÓN
                  </h2>
                  <p className="text-[#71717a] font-['Inter'] text-sm mt-1">
                    Todos los cambios requieren autorización de supervisor
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {cambiosConfiguracion.map((cambio) => (
                  <div key={cambio.id} className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[#8b5cf6] font-['Liberation_Mono'] font-bold">
                            {cambio.id}
                          </span>
                          <span className="text-[#71717a] font-['Liberation_Mono'] text-sm">
                            {cambio.fecha}
                          </span>
                        </div>
                        <h3 className="text-white font-['Space_Grotesk'] font-bold text-lg mb-1">
                          {cambio.parametro}
                        </h3>
                        <div className="text-[#a1a1aa] font-['Inter'] text-sm">
                          Modificado por: {cambio.usuario}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="bg-[#1a1a1a] border border-gray-700 rounded p-3">
                        <div className="text-[#71717a] text-xs mb-1">VALOR ANTERIOR</div>
                        <div className="text-[#ef4444] font-['Space_Grotesk'] font-bold text-lg">
                          {cambio.valorAnterior}
                        </div>
                      </div>
                      <div className="bg-[#1a1a1a] border border-gray-700 rounded p-3">
                        <div className="text-[#71717a] text-xs mb-1">VALOR NUEVO</div>
                        <div className="text-[#10b981] font-['Space_Grotesk'] font-bold text-lg">
                          {cambio.valorNuevo}
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#1a1a1a] border border-gray-700 rounded p-3">
                      <div className="text-[#71717a] text-xs mb-1">RAZÓN DEL CAMBIO</div>
                      <div className="text-white font-['Inter'] text-sm">
                        {cambio.razon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}