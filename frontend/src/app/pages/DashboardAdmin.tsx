import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Download, FileText, TrendingDown, AlertCircle, Camera, Clock, AlertTriangle } from "lucide-react";
import { useConfiguracion } from "../contexts/ConfiguracionContext";
import { useRegistros } from "../context/RegistrosContext";

export function DashboardAdmin() {
  const { config } = useConfiguracion();
  const { registros } = useRegistros();
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Actualizar el tiempo cada 15 segundos para el escalamiento dinámico
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 15000);
    return () => clearInterval(timer);
  }, []);

  const unresolvedNotifications = registros.filter(
    (r) => r.tipo === "NOTIFICACION_SUPERVISOR" && r.resuelta === false
  );

  // Fallback visual mock notifications si no hay reales
  const displayNotifications = unresolvedNotifications.length > 0 ? unresolvedNotifications : [
    {
      id: "MOCK-1",
      timestamp: new Date(Date.now() - (config.tiempoLimiteRespuestaAlerta + 2) * 60000).toISOString(),
      descripcion: "Lote LT-2024-489 superó el umbral crítico de defectos permitidos.",
      operario: "Carlos Rodríguez",
      paradaTipo: "PARADA_EMERGENCIA"
    },
    {
      id: "MOCK-2",
      timestamp: new Date(Date.now() - (config.tiempoLimiteRespuestaAlerta - 3) * 60000).toISOString(),
      descripcion: "Desviación de alineación óptica detectada en el carril 03.",
      operario: "Ana Gómez",
      paradaTipo: "PARADA_NORMAL"
    }
  ];

  const defectData = [
    {
      id: "BB-4491-01",
      description: "Microfractura detectada en el perímetro del sustrato",
      probability: "99.4%",
      severity: "ALTO",
      image: "defect1",
    },
    {
      id: "BB-4491-24",
      description: "Oxidación superficial fuera de los niveles de tolerancia",
      probability: "94.2%",
      severity: "MEDIO",
      image: "defect2",
    },
    {
      id: "BB-4491-88",
      description: "Componente SMD faltante en la posición C12",
      probability: "99.1%",
      severity: "ALTO",
      image: "defect3",
    },
    {
      id: "BB-4492-04",
      description: "Desviación dimensional de +0.05mm en eje Y",
      probability: "96.8%",
      severity: "ALTO",
      image: "defect4",
    },
  ];

  const proveedorData = [
    { 
      id: "CL-2024-001", 
      lote: "#B-8842", 
      proveedor: "CORE-TEK INC", 
      clase: "Falla Dieléctrica",
      evidencia: "VERIFICADO",
      estado: "PENDIENTE DE REVISIÓN",
      accion: "INICIAR RECLAMO"
    },
    { 
      id: "CL-2024-002", 
      lote: "#B-8830", 
      proveedor: "ZENITH-SYSTEMS", 
      clase: "Deriva Mecánica",
      evidencia: "VERIFICADO",
      estado: "ACEPTADO",
      accion: "COMPLETADO"
    },
    { 
      id: "CL-2023-994", 
      lote: "#B-D712", 
      proveedor: "CORE-TEK INC", 
      clase: "Componente Faltante",
      evidencia: "FALTA EVIDENCIA",
      estado: "RECHAZADO",
      accion: "RE-ENVIAR"
    },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a] font-['Space_Grotesk']">
      <Sidebar station="ESTACIÓN_04" />
      
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-[#1a1a1a] border-b border-gray-800 px-5 py-3 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-2xl font-bold mb-1 tracking-wide">
                REPORTES Y AUDITORÍA DE EVIDENCIAS
              </h1>
              <div className="text-gray-400 text-sm">
                Métricas operativas consolidadas y evidencia forense.
              </div>
            </div>
            <button className="px-6 py-3 bg-white text-black font-bold rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors min-h-[64px] text-sm tracking-wider">
              <Download size={20} />
              EXPORTAR PDF
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={24} className="text-gray-400" />
                <div className="text-gray-400 text-sm font-bold tracking-wider">AUDITORÍA ACTIVA</div>
              </div>
              <div className="text-white text-3xl font-bold mb-2">#B-8842-DELTA</div>
              <div className="space-y-2 mt-4">
                <div className="text-sm text-gray-400 font-bold">PROGRESO</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#f1c100] h-full" style={{ width: "84.2%" }} />
                  </div>
                  <span className="text-[#f1c100] font-bold text-sm">84.2%</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                {/* Nota: Rojo eliminado de Tasa de Defectos para cumplir WCAG AAA y exclusividad del color */}
                <TrendingDown size={24} className="text-orange-500" />
                <div className="text-gray-400 text-sm font-bold tracking-wider">TASA DE DEFECTOS</div>
              </div>
              <div className="text-orange-500 text-3xl font-bold mb-2">2.4%</div>
              <div className="text-gray-400 text-sm font-bold">+0.4% vs PROM</div>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-5 shadow-lg">
              <div className="flex items-center gap-2 mb-3">
                <FileText size={24} className="text-gray-400" />
                <div className="text-gray-400 text-sm font-bold tracking-wider">INSPECCIONADO</div>
              </div>
              <div className="text-white text-3xl font-bold mb-2">14,208</div>
              <div className="text-gray-400 text-sm font-bold">UNIDADES HOY</div>
            </div>
          </div>

          {/* Notificaciones de Sistema (Dinámicas y con Escalamiento) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-xl font-bold tracking-wide flex items-center gap-2">
                NOTIFICACIONES NO RESUELTAS (EN VIVO)
              </h2>
            </div>
            
            {displayNotifications.map((notif) => {
              const elapsedMinutes = (currentTime - new Date(notif.timestamp).getTime()) / 60000;
              const isCritical = elapsedMinutes >= config.tiempoLimiteRespuestaAlerta;
              
              return (
                <div 
                  key={notif.id} 
                  className={`border-2 rounded-lg p-6 transition-all duration-700 shadow-lg ${
                    isCritical 
                      ? 'bg-[#1a0505] border-[#ef4444] shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                      : 'bg-[#1a1a1a] border-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      {isCritical ? (
                        <AlertCircle size={40} className="text-[#ef4444] animate-pulse" />
                      ) : (
                        <AlertTriangle size={40} className="text-[#f59e0b]" />
                      )}
                      <div>
                        <div className={`font-bold text-xl tracking-wider ${isCritical ? 'text-[#ef4444]' : 'text-[#f59e0b]'}`}>
                          {isCritical ? 'ALERTA CRÍTICA - TIEMPO DE RESPUESTA EXCEDIDO' : 'ADVERTENCIA - PENDIENTE DE REVISIÓN'}
                        </div>
                        <div className="text-white mt-2 text-lg">
                          {notif.descripcion}
                        </div>
                        <div className="text-gray-400 mt-2 text-sm flex items-center gap-3 font-bold">
                          <span className="flex items-center gap-1"><Clock size={16} /> {Math.floor(elapsedMinutes)} min transcurridos</span>
                          <span>|</span>
                          <span>Operario: {notif.operario}</span>
                          <span>|</span>
                          <span>Umbral configurado: {config.tiempoLimiteRespuestaAlerta} min</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      className={`px-8 py-4 font-bold rounded transition-colors min-h-[64px] tracking-wider ${
                        isCritical 
                          ? 'bg-[#ef4444] hover:bg-[#dc2626] text-white' 
                          : 'bg-[#f59e0b] hover:bg-[#d97706] text-black'
                      }`}
                    >
                      GESTIONAR AHORA
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Evidencia Forense */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Camera size={32} className="text-white" />
                <h2 className="text-white text-2xl font-bold tracking-wide">EVIDENCIA FORENSE DE DEFECTOS</h2>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {defectData.map((item, index) => (
                <div key={item.id} className="bg-[#0a0a0a] border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors">
                  <div className="relative">
                    <div className="absolute top-3 left-3 px-3 py-1 bg-orange-600 text-white text-xs font-bold rounded tracking-wider">
                      {item.severity}
                    </div>
                    <div className="aspect-square bg-[#151515] flex items-center justify-center">
                      <span className="text-gray-600 text-sm font-bold">[Fotografía Forense {index + 1}]</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="text-gray-500 text-xs font-bold tracking-widest">ID: {item.id}</div>
                    <div className="text-white text-sm font-bold line-clamp-2 leading-relaxed">
                      {item.description}
                    </div>
                    <div className="text-sm text-gray-400 font-bold">
                      Certeza IA: <span className="text-white">{item.probability}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auditoría de Garantía */}
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-8 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-white text-2xl font-bold tracking-wide">AUDITORÍA DE GARANTÍA DE PROVEEDOR</h2>
                <div className="text-gray-400 mt-2 text-sm font-bold">
                  Registro de fallas de subcomponentes para ejecución de garantías.
                </div>
              </div>
              <button className="px-6 py-4 bg-[#2a2a2a] hover:bg-[#333] border border-gray-700 text-white font-bold rounded transition-colors min-h-[64px] tracking-wider text-sm">
                FILTRAR POR: TODOS_LOS_PROVEEDORES
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left text-gray-400 text-sm font-bold py-5 px-4 tracking-wider">ID DE RECLAMO</th>
                    <th className="text-left text-gray-400 text-sm font-bold py-5 px-4 tracking-wider">VÍNCULO DE LOTE</th>
                    <th className="text-left text-gray-400 text-sm font-bold py-5 px-4 tracking-wider">PROVEEDOR</th>
                    <th className="text-left text-gray-400 text-sm font-bold py-5 px-4 tracking-wider">CLASE DE FALLA</th>
                    <th className="text-left text-gray-400 text-sm font-bold py-5 px-4 tracking-wider">ESTADO DE EVIDENCIA</th>
                    <th className="text-left text-gray-400 text-sm font-bold py-5 px-4 tracking-wider">ESTADO DE GARANTÍA</th>
                    <th className="text-left text-gray-400 text-sm font-bold py-5 px-4 tracking-wider">ACCIÓN</th>
                  </tr>
                </thead>
                <tbody>
                  {proveedorData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-800 hover:bg-[#151515] transition-colors">
                      <td className="py-6 px-4 text-white font-bold">{item.id}</td>
                      <td className="py-6 px-4 text-gray-300">{item.lote}</td>
                      <td className="py-6 px-4 text-gray-300">{item.proveedor}</td>
                      <td className="py-6 px-4 text-gray-300">{item.clase}</td>
                      <td className="py-6 px-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-sm font-bold tracking-wider ${
                          item.evidencia === "VERIFICADO" 
                            ? "bg-green-900/20 text-green-500 border border-green-900/50" 
                            : "bg-orange-900/20 text-orange-500 border border-orange-900/50"
                        }`}>
                          {item.evidencia}
                        </span>
                      </td>
                      <td className="py-6 px-4">
                        <span className={`px-3 py-1.5 rounded text-sm font-bold tracking-wider ${
                          item.estado === "ACEPTADO" 
                            ? "bg-green-900/20 text-green-500 border border-green-900/50" 
                            : item.estado === "RECHAZADO"
                            ? "bg-orange-900/20 text-orange-500 border border-orange-900/50"
                            : "bg-blue-900/20 text-blue-500 border border-blue-900/50"
                        }`}>
                          {item.estado}
                        </span>
                      </td>
                      <td className="py-6 px-4">
                        <button className={`px-6 py-3 rounded font-bold text-sm transition-colors min-h-[50px] tracking-wider ${
                          item.accion === "INICIAR RECLAMO"
                            ? "bg-orange-600 hover:bg-orange-500 text-white"
                            : item.accion === "COMPLETADO"
                            ? "bg-green-600/20 text-green-500 border border-green-600/30 cursor-default"
                            : "bg-blue-600 hover:bg-blue-500 text-white"
                        }`}>
                          {item.accion}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-800">
              <div className="text-gray-400 text-sm font-bold tracking-wider">
                MOSTRANDO 3 ENTRADAS ACTIVAS
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-[#2a2a2a] hover:bg-[#333] border border-gray-700 text-white font-bold rounded transition-colors min-h-[64px] tracking-wider text-sm">
                  ANTERIOR
                </button>
                <button className="px-6 py-3 bg-[#2a2a2a] hover:bg-[#333] border border-gray-700 text-white font-bold rounded transition-colors min-h-[64px] tracking-wider text-sm">
                  SIGUIENTE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}