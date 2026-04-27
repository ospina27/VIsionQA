import { useState } from "react";
import { SidebarVisionQA } from "../components/SidebarVisionQA";
import { HelpCenter } from "../components/HelpCenter";
import { EditarUmbralesModal } from "../components/EditarUmbralesModal";
import { GestionOperarioModal } from "../components/GestionOperarioModal";
import { NuevoProveedorModal } from "../components/NuevoProveedorModal";
import { CalibrarEstacionModal } from "../components/CalibrarEstacionModal";
import { DiagnosticoEstacionModal } from "../components/DiagnosticoEstacionModal";
import { ParametrosCalidadModal } from "../components/ParametrosCalidadModal";
import { useAuth } from "../contexts/AuthContext";
import { useConfiguracion } from "../contexts/ConfiguracionContext";
import {
  Settings,
  Users,
  Shield,
  Database,
  Camera,
  AlertTriangle,
  CheckCircle,
  Plus,
  Edit,
  Activity,
  TrendingUp,
  Award,
  Package,
} from "lucide-react";

type Tab = "CALIDAD" | "OPERARIOS" | "ESTACIONES" | "PROVEEDORES" | "ENVASES";

interface Operario {
  id: string;
  nombre: string;
  turno: string;
  estacion: string;
  estado: string;
  inspecciones: number;
  performance: number;
}

interface Estacion {
  id: string;
  modelo: string;
  estado: string;
  uptime: string;
  ultimaCalib: string;
  lotes: number;
}

// ── Tipos para modales ─────────────────────────────────────────────────────
type ModalState =
  | { tipo: "ninguno" }
  | { tipo: "editarUmbrales" }
  | { tipo: "parametrosCalidad" }
  | { tipo: "gestionOperario"; modo: "editar" | "agregar" | "suspender"; operario?: Operario }
  | { tipo: "nuevoProveedor" }
  | { tipo: "calibrarEstacion"; estacion: Estacion }
  | { tipo: "diagnosticoEstacion"; estacion: Estacion };

export function Administracion() {
  const [activeTab, setActiveTab] = useState<Tab>("CALIDAD");
  const { isAdmin, canManageProveedores, isProductor } = useAuth();
  const { config, actualizarConfig } = useConfiguracion();
  const [modal, setModal] = useState<ModalState>({ tipo: "ninguno" });

  // ── Estado reactivo de operarios ───────────────────────────────────────────
  const [operarios, setOperarios] = useState<Operario[]>([
    { id: "LEG-4482", nombre: "GARCÍA, MIGUEL",    turno: "A", estacion: "ESTACIÓN_01", estado: "ACTIVO",   inspecciones: 1240, performance: 98.2 },
    { id: "LEG-4483", nombre: "RODRÍGUEZ, ANA",    turno: "B", estacion: "ESTACIÓN_02", estado: "ACTIVO",   inspecciones: 1180, performance: 97.8 },
    { id: "LEG-4484", nombre: "LÓPEZ, CARLOS",     turno: "A", estacion: "ESTACIÓN_03", estado: "DESCANSO", inspecciones: 980,  performance: 96.5 },
    { id: "LEG-4485", nombre: "MARTÍNEZ, LUCIA",   turno: "C", estacion: "ESTACIÓN_04", estado: "ACTIVO",   inspecciones: 1340, performance: 99.1 },
  ]);

  // ── Estado reactivo de estaciones ─────────────────────────────────────────
  const [estaciones, setEstaciones] = useState<Estacion[]>([
    { id: "ESTACIÓN_01", modelo: "YOLO-V8-INDUSTRIAL", estado: "OPERATIVO",    uptime: "99.2%", ultimaCalib: "Hace 2h",  lotes: 24 },
    { id: "ESTACIÓN_02", modelo: "YOLO-V8-INDUSTRIAL", estado: "OPERATIVO",    uptime: "98.8%", ultimaCalib: "Hace 4h",  lotes: 22 },
    { id: "ESTACIÓN_03", modelo: "YOLO-V8-INDUSTRIAL", estado: "MANTENIMIENTO", uptime: "0%",    ultimaCalib: "Hace 8h",  lotes: 0  },
    { id: "ESTACIÓN_04", modelo: "YOLO-V8-INDUSTRIAL", estado: "OPERATIVO",    uptime: "99.8%", ultimaCalib: "Hace 1h",  lotes: 26 },
  ]);

  const proveedores = [
    { id: "PROV-001", nombre: "PLASTICOS_DEL_SUR",  categoria: "MATERIA PRIMA", rating: "A", lotes: 142, defectos: 0.8, calidad: 99.2 },
    { id: "PROV-002", nombre: "ENVASES_NORTE_SA",   categoria: "MATERIA PRIMA", rating: "A", lotes: 98,  defectos: 0.6, calidad: 99.4 },
    { id: "PROV-003", nombre: "INDUSTRIAS_CRESPO",  categoria: "COMPONENTES",   rating: "B", lotes: 64,  defectos: 1.2, calidad: 98.8 },
    { id: "PROV-004", nombre: "POLYMER_SOLUTIONS",  categoria: "ADITIVOS",      rating: "C", lotes: 52,  defectos: 2.1, calidad: 97.9 },
  ];

  const envases = [
    { id: "ENV-001", nombre: "BOTELLA PET 500ML",    capacidad: "500 ml",  material: "PET",  linea: "LÍNEA_01", lotes: 87,  defectos: 0.4, calidad: 99.6 },
    { id: "ENV-002", nombre: "TAPA ROSCA ø28",       capacidad: "—",       material: "HDPE", linea: "LÍNEA_02", lotes: 112, defectos: 0.7, calidad: 99.3 },
    { id: "ENV-003", nombre: "PREFORMA 26G",         capacidad: "26 g",    material: "PET",  linea: "LÍNEA_01", lotes: 65,  defectos: 1.1, calidad: 98.9 },
    { id: "ENV-004", nombre: "BOTELLA PEAD 1L",      capacidad: "1000 ml", material: "HDPE", linea: "LÍNEA_03", lotes: 44,  defectos: 0.9, calidad: 99.1 },
    { id: "ENV-005", nombre: "TARRO PP 250G",        capacidad: "250 g",   material: "PP",   linea: "LÍNEA_02", lotes: 33,  defectos: 1.5, calidad: 98.5 },
  ];

  // ── Umbrales state ─────────────────────────────────────────────────────────
  const [umbrales, setUmbrales] = useState({
    lenteNitidez: 85, lenteSop: "SOP-CAM-01",
    redTimeout: 5,    redSop: "SOP-RED-02",
    loteDefectos: 4,  loteSop: "SOP-QA-03",
  });

  // ── Handlers de modales ───────────────────────────────────────────────────
  const cerrarModal = () => setModal({ tipo: "ninguno" });

  const handleSaveOperario = (op: Operario) => {
    setOperarios((prev) => {
      const idx = prev.findIndex((o) => o.id === op.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...op };
        return next;
      }
      return [...prev, { ...op, inspecciones: 0, performance: 0 }];
    });
  };

  const handleSuspender = (id: string) => {
    setOperarios((prev) =>
      prev.map((o) => (o.id === id ? { ...o, estado: "SUSPENDIDO" } : o))
    );
  };

  const handleCalibrado = (estacionId: string) => {
    setEstaciones((prev) =>
      prev.map((e) =>
        e.id === estacionId ? { ...e, ultimaCalib: "Hace 0 min" } : e
      )
    );
  };

  // Filtrar pestañas según permisos
  const allTabs = [
    { id: "CALIDAD" as Tab,      label: "Parámetros de Calidad",  icon: Shield   },
    { id: "OPERARIOS" as Tab,    label: "Gestión de Operarios",   icon: Users    },
    { id: "ESTACIONES" as Tab,   label: "Estaciones VisionQA",    icon: Camera   },
    { id: "PROVEEDORES" as Tab,  label: "Proveedores",            icon: Database },
    { id: "ENVASES" as Tab,      label: "Catálogo de Envases",    icon: Package  },
  ];

  // Admin Abastecedor ve PROVEEDORES; Admin Productor ve ENVASES
  const tabs = allTabs.filter(tab => {
    if (tab.id === "PROVEEDORES") return canManageProveedores();
    if (tab.id === "ENVASES")     return isAdmin() && isProductor();
    return true;
  });

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <SidebarVisionQA active="sistema" />

      <div className="flex-1 flex flex-col ml-16 xl:ml-56 pt-14 xl:pt-16">

        {/* ── Header ── */}
        <div className="absolute top-0 left-0 right-0 h-16 backdrop-blur-xl bg-[rgba(10,10,10,0.8)] border-b-2 border-[rgba(127,29,29,0.3)] shadow-[0px_0px_30px_0px_rgba(255,59,48,0.2)] flex items-center justify-between px-6 z-50">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-white font-['Space_Grotesk'] font-bold text-lg">VisionQA</div>
              <div className="bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)] rounded-sm px-2 py-0.5">
                <div className="text-[#8b5cf6] font-['Inter'] font-bold text-[10px]">ADMINISTRACIÓN_SISTEMA</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <HelpCenter />
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="bg-[#1a1a1a] border-b border-gray-800 px-6 py-3">
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded font-['Space_Grotesk'] font-bold text-sm transition-all ${
                    isActive ? "bg-[#8b5cf6] text-white" : "bg-[#2a2a2a] text-[#71717a] hover:bg-[#3a3a3a]"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 overflow-auto p-6 space-y-6">

          {/* ══ TAB: CALIDAD ══ */}
          {activeTab === "CALIDAD" && (
            <>
              {/* Parámetros AQL */}
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-white font-['Space_Grotesk'] font-bold text-2xl">PARÁMETROS DE CALIDAD ISO 2859-1</h2>
                    <p className="text-[#71717a] font-['Inter'] text-sm mt-2">Nivel de Calidad Aceptable y criterios de aceptación/rechazo de lotes</p>
                  </div>
                  {isAdmin() && (
                    <button
                      onClick={() => setModal({ tipo: "parametrosCalidad" })}
                      className="flex items-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-['Space_Grotesk'] font-bold px-6 py-4 rounded transition-colors min-h-[64px]"
                    >
                      <Edit size={18} />
                      MODIFICAR PARÁMETROS
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#2a2a2a] border-2 border-[#10b981] rounded-lg p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-[#10b981]/20 rounded-lg"><Shield size={20} className="text-[#10b981]" /></div>
                      <div className="text-[#71717a] font-['Space_Grotesk'] text-xs uppercase">AQL Configurado</div>
                    </div>
                    <div className="text-[#10b981] font-['Space_Grotesk'] font-bold text-4xl mb-1">{config.aqlPorcentaje}%</div>
                    <div className="text-[#a1a1aa] font-['Inter'] text-xs">AQL Global</div>
                  </div>

                  <div className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-5">
                    <div className="text-[#71717a] font-['Space_Grotesk'] text-xs uppercase mb-3">Nivel de Inspección</div>
                    <div className="text-white font-['Space_Grotesk'] font-bold text-4xl mb-1">Nivel {config.nivelInspeccion}</div>
                    <div className="text-[#a1a1aa] font-['Inter'] text-xs">ISO 2859-1</div>
                  </div>

                  <div className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-5">
                    <div className="text-[#71717a] font-['Space_Grotesk'] text-xs uppercase mb-3">Tipo de Inspección</div>
                    <div className="text-[#3b82f6] font-['Space_Grotesk'] font-bold text-4xl mb-1 capitalize">{config.tipoInspeccion.toLowerCase()}</div>
                    <div className="text-[#a1a1aa] font-['Inter'] text-xs">Muestreo Simple</div>
                  </div>
                </div>

                <div className="mt-6 bg-[#f59e0b]/10 border-2 border-[#f59e0b] rounded-lg p-4 flex items-start gap-4">
                  <AlertTriangle size={24} className="text-[#f59e0b] flex-shrink-0" />
                  <div className="text-[#d4d4d8] font-['Inter'] text-sm">
                    <span className="font-bold text-[#f59e0b]">ATENCIÓN:</span> Cualquier modificación a los parámetros AQL requiere autorización escrita del Supervisor de Control de Calidad y debe ser documentada en el registro de cambios.
                  </div>
                </div>
              </div>

              {/* Umbrales */}
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-white font-['Space_Grotesk'] font-bold text-2xl">CONFIGURACIÓN DE ALERTAS Y UMBRALES</h2>
                    <p className="text-[#71717a] font-['Inter'] text-sm mt-2">Umbrales operativos en tiempo real para todas las estaciones</p>
                  </div>
                  {isAdmin() && (
                    <button
                      onClick={() => setModal({ tipo: "editarUmbrales" })}
                      className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-gray-700 text-white font-['Space_Grotesk'] font-bold px-6 py-4 rounded transition-colors min-h-[64px]"
                    >
                      <Settings size={18} />
                      EDITAR UMBRALES
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                  {[
                    {
                      titulo: "LENTE SUCIO",
                      nivel: "MEDIA",
                      nivelColor: "bg-[#f59e0b]/20 text-[#f59e0b]",
                      fields: [
                        { label: "Segundos sin detección", value: `${config.umbralLenteSucio} seg` },
                      ],
                    },
                    {
                      titulo: "FALLO DE RED",
                      nivel: "ALTA",
                      nivelColor: "bg-[#ef4444]/20 text-[#ef4444]",
                      fields: [
                        { label: "Timeout de conexión", value: `${config.umbralFalloRed} seg` },
                      ],
                    },
                    {
                      titulo: "LOTE CRÍTICO",
                      nivel: "CRÍTICA",
                      nivelColor: "bg-[#ef4444]/20 text-[#ef4444]",
                      fields: [
                        { label: "Umbral Defectos", value: `> ${config.umbralLoteCritico}%` },
                      ],
                    },
                    {
                      titulo: "TIEMPO RESPUESTA",
                      nivel: "ESCALA A CRÍTICA",
                      nivelColor: "bg-[#8b5cf6]/20 text-[#8b5cf6]",
                      fields: [
                        { label: "Tiempo Límite", value: `${config.tiempoLimiteRespuestaAlerta} min` },
                      ],
                    },
                  ].map((a) => (
                    <div key={a.titulo} className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-white font-['Space_Grotesk'] font-bold">{a.titulo}</div>
                      </div>
                      <div className="mb-4">
                        <span className={`px-3 py-1 ${a.nivelColor} rounded text-xs font-bold`}>{a.nivel}</span>
                      </div>
                      <div className="space-y-3">
                        {a.fields.map((f) => (
                          <div key={f.label} className="flex flex-col gap-1">
                            <span className="text-[#a1a1aa] text-xs uppercase">{f.label}</span>
                            <span className="font-['Liberation_Mono'] font-bold text-white text-lg">{f.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ══ TAB: OPERARIOS ══ */}
          {activeTab === "OPERARIOS" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#10b981]/20 rounded-lg"><Users size={20} className="text-[#10b981]" /></div>
                    <div className="text-[#71717a] text-xs uppercase">Operarios Activos</div>
                  </div>
                  <div className="text-[#10b981] font-['Space_Grotesk'] font-bold text-3xl">
                    {operarios.filter((o) => o.estado === "ACTIVO").length}/{operarios.length}
                  </div>
                </div>

                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#3b82f6]/20 rounded-lg"><Activity size={20} className="text-[#3b82f6]" /></div>
                    <div className="text-[#71717a] text-xs uppercase">Performance Promedio</div>
                  </div>
                  <div className="text-[#3b82f6] font-['Space_Grotesk'] font-bold text-3xl">
                    {operarios.length > 0
                      ? (operarios.reduce((sum, o) => sum + o.performance, 0) / operarios.length).toFixed(1)
                      : "—"}%
                  </div>
                </div>

                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#8b5cf6]/20 rounded-lg"><TrendingUp size={20} className="text-[#8b5cf6]" /></div>
                    <div className="text-[#71717a] text-xs uppercase">Inspecciones Hoy</div>
                  </div>
                  <div className="text-[#8b5cf6] font-['Space_Grotesk'] font-bold text-3xl">
                    {operarios.reduce((sum, o) => sum + o.inspecciones, 0).toLocaleString()}
                  </div>
                </div>

                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-5">
                  <button
                    onClick={() => setModal({ tipo: "gestionOperario", modo: "agregar" })}
                    className="w-full h-full flex flex-col items-center justify-center gap-2 text-white hover:bg-[#2a2a2a] rounded transition-colors min-h-[64px]"
                  >
                    <Plus size={32} className="text-[#10b981]" />
                    <span className="font-['Space_Grotesk'] font-bold text-sm">AGREGAR OPERARIO</span>
                  </button>
                </div>
              </div>

              {/* Tabla */}
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-white font-['Space_Grotesk'] font-bold text-2xl">GESTIÓN DE OPERARIOS</h2>
                </div>
                <table className="w-full">
                  <thead className="bg-[#2a2a2a]">
                    <tr>
                      {["Legajo", "Nombre", "Turno", "Estación", "Estado", "Inspecciones", "Performance", "Acciones"].map((h) => (
                        <th key={h} className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {operarios.map((op, idx) => (
                      <tr key={op.id} className={idx % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#1f1f1f]"}>
                        <td className="px-6 py-5 text-white font-['Liberation_Mono'] font-bold">{op.id}</td>
                        <td className="px-6 py-5 text-white font-['Inter']">{op.nombre}</td>
                        <td className="px-6 py-5">
                          <span className="px-3 py-1 bg-[#2a2a2a] border border-gray-700 text-white rounded text-sm font-bold">TURNO {op.turno}</span>
                        </td>
                        <td className="px-6 py-5 text-[#a1a1aa] font-['Inter']">{op.estacion}</td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-bold ${
                            op.estado === "ACTIVO"     ? "bg-[#10b981]/20 text-[#10b981]" :
                            op.estado === "DESCANSO"   ? "bg-[#f59e0b]/20 text-[#f59e0b]" :
                                                         "bg-[#ef4444]/20 text-[#ef4444]"
                          }`}>
                            {op.estado === "ACTIVO" ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                            {op.estado}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-white font-['Space_Grotesk'] font-bold">{op.inspecciones.toLocaleString()}</td>
                        <td className="px-6 py-5">
                          <span className={`font-['Space_Grotesk'] font-bold ${
                            op.performance >= 98 ? "text-[#10b981]" :
                            op.performance >= 95 ? "text-[#3b82f6]" : "text-[#f59e0b]"
                          }`}>
                            {op.performance > 0 ? `${op.performance}%` : "—"}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex gap-2">
                            <button
                              onClick={() => setModal({ tipo: "gestionOperario", modo: "editar", operario: op })}
                              className="px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded text-sm font-bold transition-colors min-h-[40px]"
                            >
                              EDITAR
                            </button>
                            {op.estado !== "SUSPENDIDO" && (
                              <button
                                onClick={() => setModal({ tipo: "gestionOperario", modo: "suspender", operario: op })}
                                className="px-4 py-2 bg-[#2a2a2a] hover:bg-[#3a2020] border border-gray-700 text-[#ef4444] rounded text-sm font-bold transition-colors min-h-[40px]"
                              >
                                SUSPENDER
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══ TAB: ESTACIONES ══ */}
          {activeTab === "ESTACIONES" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {estaciones.map((est) => (
                  <div key={est.id} className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-lg ${est.estado === "OPERATIVO" ? "bg-[#10b981]/20" : "bg-[#ef4444]/20"}`}>
                          <Camera size={32} className={est.estado === "OPERATIVO" ? "text-[#10b981]" : "text-[#ef4444]"} />
                        </div>
                        <div>
                          <div className="text-white font-['Space_Grotesk'] font-bold text-2xl mb-1">{est.id}</div>
                          <div className="text-[#a1a1aa] font-['Inter'] text-sm">{est.modelo}</div>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded text-xs font-bold ${
                        est.estado === "OPERATIVO" ? "bg-[#10b981]/20 text-[#10b981]" : "bg-[#ef4444]/20 text-[#ef4444]"
                      }`}>
                        {est.estado}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-[#2a2a2a] border border-gray-700 rounded p-3">
                        <div className="text-[#71717a] text-xs mb-1">UPTIME</div>
                        <div className={`font-['Space_Grotesk'] font-bold text-lg ${parseFloat(est.uptime) >= 99 ? "text-[#10b981]" : "text-[#f59e0b]"}`}>{est.uptime}</div>
                      </div>
                      <div className="bg-[#2a2a2a] border border-gray-700 rounded p-3">
                        <div className="text-[#71717a] text-xs mb-1">LOTES HOY</div>
                        <div className="text-[#3b82f6] font-['Space_Grotesk'] font-bold text-lg">{est.lotes}</div>
                      </div>
                      <div className="bg-[#2a2a2a] border border-gray-700 rounded p-3">
                        <div className="text-[#71717a] text-xs mb-1">ÚLTIMA CALIB</div>
                        <div className="text-white font-['Space_Grotesk'] font-bold text-sm">{est.ultimaCalib}</div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setModal({ tipo: "calibrarEstacion", estacion: est })}
                        className="flex-1 px-4 py-3 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded font-['Space_Grotesk'] font-bold text-sm transition-colors min-h-[52px]"
                      >
                        CALIBRAR
                      </button>
                      <button
                        onClick={() => setModal({ tipo: "diagnosticoEstacion", estacion: est })}
                        className="flex-1 px-4 py-3 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-gray-700 text-white rounded font-['Space_Grotesk'] font-bold text-sm transition-colors min-h-[52px]"
                      >
                        DIAGNÓSTICO
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ TAB: PROVEEDORES ══ */}
          {activeTab === "PROVEEDORES" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#3b82f6]/20 rounded-lg"><Database size={20} className="text-[#3b82f6]" /></div>
                    <div className="text-[#71717a] text-xs uppercase">Proveedores Activos</div>
                  </div>
                  <div className="text-[#3b82f6] font-['Space_Grotesk'] font-bold text-3xl">{proveedores.length}</div>
                </div>

                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#10b981]/20 rounded-lg"><Award size={20} className="text-[#10b981]" /></div>
                    <div className="text-[#71717a] text-xs uppercase">Rating A</div>
                  </div>
                  <div className="text-[#10b981] font-['Space_Grotesk'] font-bold text-3xl">
                    {proveedores.filter((p) => p.rating === "A").length}
                  </div>
                </div>

                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#8b5cf6]/20 rounded-lg"><TrendingUp size={20} className="text-[#8b5cf6]" /></div>
                    <div className="text-[#71717a] text-xs uppercase">Calidad Promedio</div>
                  </div>
                  <div className="text-[#8b5cf6] font-['Space_Grotesk'] font-bold text-3xl">98.8%</div>
                </div>

                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-5">
                  <button
                    onClick={() => setModal({ tipo: "nuevoProveedor" })}
                    className="w-full h-full flex flex-col items-center justify-center gap-2 text-white hover:bg-[#2a2a2a] rounded transition-colors min-h-[64px]"
                  >
                    <Plus size={32} className="text-[#10b981]" />
                    <span className="font-['Space_Grotesk'] font-bold text-sm">NUEVO PROVEEDOR</span>
                  </button>
                </div>
              </div>

              {/* Tabla proveedores */}
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-white font-['Space_Grotesk'] font-bold text-2xl">REGISTRO DE PROVEEDORES</h2>
                </div>
                <table className="w-full">
                  <thead className="bg-[#2a2a2a]">
                    <tr>
                      {["ID", "Proveedor", "Categoría", "Rating", "Lotes", "% Defectos", "Calidad", "Acción"].map((h) => (
                        <th key={h} className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {proveedores.map((prov, idx) => (
                      <tr key={prov.id} className={idx % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#1f1f1f]"}>
                        <td className="px-6 py-5 text-white font-['Liberation_Mono'] font-bold">{prov.id}</td>
                        <td className="px-6 py-5 text-white font-['Inter']">{prov.nombre}</td>
                        <td className="px-6 py-5 text-[#a1a1aa] font-['Inter'] text-sm">{prov.categoria}</td>
                        <td className="px-6 py-5">
                          <span className={`px-3 py-1 rounded text-xs font-bold ${
                            prov.rating === "A" ? "bg-[#10b981]/20 text-[#10b981]" :
                            prov.rating === "B" ? "bg-[#3b82f6]/20 text-[#3b82f6]" :
                                                   "bg-[#f59e0b]/20 text-[#f59e0b]"
                          }`}>
                            RATING {prov.rating}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-white font-['Space_Grotesk'] font-bold">{prov.lotes}</td>
                        <td className="px-6 py-5">
                          <span className={`font-['Space_Grotesk'] font-bold ${
                            prov.defectos <= 1.0 ? "text-[#10b981]" :
                            prov.defectos <= 1.5 ? "text-[#3b82f6]" : "text-[#ef4444]"
                          }`}>
                            {prov.defectos}%
                          </span>
                        </td>
                        <td className="px-6 py-5 text-[#10b981] font-['Space_Grotesk'] font-bold">{prov.calidad}%</td>
                        <td className="px-6 py-5">
                          <button className="px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded text-sm font-bold transition-colors min-h-[40px]">
                            VER HISTORIAL
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ══ TAB: ENVASES ══ */}
          {activeTab === "ENVASES" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#3b82f6]/20 rounded-lg"><Package size={20} className="text-[#3b82f6]" /></div>
                    <div className="text-[#71717a] text-xs uppercase">Tipos de Envase</div>
                  </div>
                  <div className="text-[#3b82f6] font-['Space_Grotesk'] font-bold text-3xl">{envases.length}</div>
                </div>

                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#10b981]/20 rounded-lg"><Award size={20} className="text-[#10b981]" /></div>
                    <div className="text-[#71717a] text-xs uppercase">Calidad Promedio</div>
                  </div>
                  <div className="text-[#10b981] font-['Space_Grotesk'] font-bold text-3xl">
                    {(envases.reduce((s, e) => s + e.calidad, 0) / envases.length).toFixed(1)}%
                  </div>
                </div>

                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-[#8b5cf6]/20 rounded-lg"><TrendingUp size={20} className="text-[#8b5cf6]" /></div>
                    <div className="text-[#71717a] text-xs uppercase">Lotes Producidos</div>
                  </div>
                  <div className="text-[#8b5cf6] font-['Space_Grotesk'] font-bold text-3xl">
                    {envases.reduce((s, e) => s + e.lotes, 0)}
                  </div>
                </div>

                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-5">
                  <button
                    className="w-full h-full flex flex-col items-center justify-center gap-2 text-white hover:bg-[#2a2a2a] rounded transition-colors min-h-[64px]"
                  >
                    <Plus size={32} className="text-[#10b981]" />
                    <span className="font-['Space_Grotesk'] font-bold text-sm">NUEVO ENVASE</span>
                  </button>
                </div>
              </div>

              {/* Tabla envases */}
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-700">
                  <h2 className="text-white font-['Space_Grotesk'] font-bold text-2xl">CATÁLOGO DE ENVASES — PRODUCCIÓN PROPIA</h2>
                  <p className="text-[#71717a] font-['Inter'] text-sm mt-1">Tipos de envase fabricados en planta. Líneas de producción activas.</p>
                </div>
                <table className="w-full">
                  <thead className="bg-[#2a2a2a]">
                    <tr>
                      {["Código", "Envase", "Capacidad", "Material", "Línea", "Lotes", "% Defectos", "Calidad", "Acción"].map((h) => (
                        <th key={h} className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {envases.map((env, idx) => (
                      <tr key={env.id} className={idx % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#1f1f1f]"}>
                        <td className="px-6 py-5 text-white font-['Liberation_Mono'] font-bold">{env.id}</td>
                        <td className="px-6 py-5 text-white font-['Inter']">{env.nombre}</td>
                        <td className="px-6 py-5 text-[#a1a1aa] font-['Inter'] text-sm">{env.capacidad}</td>
                        <td className="px-6 py-5">
                          <span className={`px-3 py-1 rounded text-xs font-bold ${
                            env.material === "PET"  ? "bg-[#3b82f6]/20 text-[#3b82f6]" :
                            env.material === "HDPE" ? "bg-[#10b981]/20 text-[#10b981]" :
                                                      "bg-[#8b5cf6]/20 text-[#8b5cf6]"
                          }`}>
                            {env.material}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-[#a1a1aa] font-['Inter'] text-sm">{env.linea}</td>
                        <td className="px-6 py-5 text-white font-['Space_Grotesk'] font-bold">{env.lotes}</td>
                        <td className="px-6 py-5">
                          <span className={`font-['Space_Grotesk'] font-bold ${
                            env.defectos <= 0.8 ? "text-[#10b981]" :
                            env.defectos <= 1.2 ? "text-[#3b82f6]" : "text-[#ef4444]"
                          }`}>
                            {env.defectos}%
                          </span>
                        </td>
                        <td className="px-6 py-5 text-[#10b981] font-['Space_Grotesk'] font-bold">{env.calidad}%</td>
                        <td className="px-6 py-5">
                          <button className="px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white rounded text-sm font-bold transition-colors min-h-[40px]">
                            VER HISTORIAL
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══ MODALES ══ */}
      {modal.tipo === "parametrosCalidad" && (
        <ParametrosCalidadModal
          onClose={cerrarModal}
          currentParams={config}
          onSave={(params) => actualizarConfig(params)}
        />
      )}
      {modal.tipo === "editarUmbrales" && (
        <EditarUmbralesModal
          onClose={cerrarModal}
          currentConfig={config}
          onSave={(params) => actualizarConfig(params)}
        />
      )}

      {modal.tipo === "gestionOperario" && (
        <GestionOperarioModal
          modo={modal.modo}
          operario={modal.operario}
          onClose={cerrarModal}
          onSave={handleSaveOperario}
          onSuspender={handleSuspender}
        />
      )}

      {modal.tipo === "nuevoProveedor" && (
        <NuevoProveedorModal
          onClose={cerrarModal}
          onSave={(data) => {
            console.log("Nuevo proveedor:", data);
          }}
        />
      )}

      {modal.tipo === "calibrarEstacion" && (
        <CalibrarEstacionModal
          estacion={modal.estacion}
          onClose={cerrarModal}
          onCalibrado={handleCalibrado}
        />
      )}

      {modal.tipo === "diagnosticoEstacion" && (
        <DiagnosticoEstacionModal
          estacion={modal.estacion}
          onClose={cerrarModal}
        />
      )}
    </div>
  );
}