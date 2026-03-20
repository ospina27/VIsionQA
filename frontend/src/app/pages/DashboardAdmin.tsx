import { Sidebar } from "../components/Sidebar";
import { Download, FileText, TrendingDown, AlertCircle, Camera } from "lucide-react";

export function DashboardAdmin() {
  const defectData = [
    {
      id: "BB-4491-01",
      description: "Microfractura detectada en el perímetro del sustrato",
      probability: "99.4%",
      severity: "CRÍTICO",
      image: "defect1",
    },
    {
      id: "BB-4491-24",
      description: "Oxidación superficial fuera de los niveles de tolerancia",
      probability: "94.2%",
      severity: "ADVERTENCIA",
      image: "defect2",
    },
    {
      id: "BB-4491-88",
      description: "Componente SMD faltante en la posición C12",
      probability: "99.1%",
      severity: "CRÍTICO",
      image: "defect3",
    },
    {
      id: "BB-4492-04",
      description: "Desviación dimensional de +0.05mm en eje Y",
      probability: "96.8%",
      severity: "CRÍTICO",
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
    <div className="flex h-screen bg-[#0a0a0a]">
      <Sidebar station="ESTACIÓN_04" />
      
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-[#1a1a1a] border-b border-gray-800 px-5 py-3 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-xl font-bold mb-1">
                REPORTES Y AUDITORÍA DE EVIDENCIAS
              </h1>
              <div className="text-gray-400 text-xs">
                Métricas operativas consolidadas y evidencia forense para la verificación del cumplimiento de lotes.
              </div>
            </div>
            <button className="px-5 py-3 bg-white text-black font-bold rounded-lg flex items-center gap-2 hover:bg-gray-200 transition-colors min-h-[64px] text-sm">
              <Download size={18} />
              EXPORTAR PDF
            </button>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Stats Overview - Compacto */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={20} className="text-gray-400" />
                <div className="text-gray-400 text-xs">AUDITORÍA ACTIVA</div>
              </div>
              <div className="text-white text-xl font-bold mb-1">#B-8842-DELTA</div>
              <div className="space-y-1 mt-2">
                <div className="text-xs text-gray-400">PROGRESO</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-yellow-500 h-full" style={{ width: "84.2%" }} />
                  </div>
                  <span className="text-yellow-500 font-bold text-xs">84.2%</span>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown size={20} className="text-red-500" />
                <div className="text-gray-400 text-xs">TASA DE DEFECTOS</div>
              </div>
              <div className="text-red-500 text-xl font-bold mb-1">2.4%</div>
              <div className="text-gray-500 text-xs">+0.4% vs PROM</div>
            </div>

            <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={20} className="text-gray-400" />
                <div className="text-gray-400 text-xs">INSPECCIONADO</div>
              </div>
              <div className="text-white text-xl font-bold mb-1">14,208</div>
              <div className="text-gray-500 text-xs">UNIDADES HOY</div>
            </div>
          </div>

          {/* Critical Alert */}
          <div className="bg-red-900/30 border-2 border-red-500 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <AlertCircle size={32} className="text-red-500" />
                <div>
                  <div className="text-red-500 font-bold text-xl">ALERTA CRÍTICA</div>
                  <div className="text-gray-300 mt-1">
                    Desviación de alineación óptica detectada en el carril 03.
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded transition-colors min-h-[64px]">
                VER REGISTROS DE CALIBRACIÓN
              </button>
            </div>
          </div>

          {/* Evidencia Forense */}
          <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Camera size={32} className="text-[#ff6b6b]" />
                <h2 className="text-white text-2xl font-bold">EVIDENCIA FORENSE DE DEFECTOS</h2>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors min-h-[64px]">
                  <div className="w-8 h-8 grid grid-cols-2 gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-white rounded-sm" />
                    ))}
                  </div>
                </button>
                <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors min-h-[64px]">
                  <div className="space-y-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-8 h-1 bg-white rounded" />
                    ))}
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {defectData.map((item, index) => (
                <div key={item.id} className="bg-[#0a0a0a] border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-colors">
                  <div className="relative">
                    <div className="absolute top-2 left-2 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded">
                      {item.severity === "CRÍTICO" ? "CRÍTICO" : "ADVERTENCIA"}
                    </div>
                    <div className="aspect-square bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-600 text-xs">[Imagen {index + 1}]</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="text-gray-500 text-xs">ID: {item.id}</div>
                    <div className="text-white text-sm font-bold line-clamp-2">
                      {item.description}
                    </div>
                    <div className="text-xs text-gray-400">
                      Probabilidad: <span className="text-white font-bold">{item.probability}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Auditoría de Garantía */}
          <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white text-2xl font-bold">AUDITORÍA DE GARANTÍA DE PROVEEDOR</h2>
                <div className="text-gray-400 mt-1">
                  Registro de fallas de subcomponentes para ejecución de garantías.
                </div>
              </div>
              <button className="px-6 py-4 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded transition-colors min-h-[64px]">
                FILTRAR POR: TODOS_LOS_PROVEEDORES
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left text-gray-400 text-sm font-bold py-4 px-4">ID DE RECLAMO</th>
                    <th className="text-left text-gray-400 text-sm font-bold py-4 px-4">VÍNCULO DE LOTE</th>
                    <th className="text-left text-gray-400 text-sm font-bold py-4 px-4">PROVEEDOR</th>
                    <th className="text-left text-gray-400 text-sm font-bold py-4 px-4">CLASE DE FALLA</th>
                    <th className="text-left text-gray-400 text-sm font-bold py-4 px-4">ESTADO DE EVIDENCIA</th>
                    <th className="text-left text-gray-400 text-sm font-bold py-4 px-4">ESTADO DE GARANTÍA</th>
                    <th className="text-left text-gray-400 text-sm font-bold py-4 px-4">ACCIÓN</th>
                  </tr>
                </thead>
                <tbody>
                  {proveedorData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-800 hover:bg-[#151515] transition-colors">
                      <td className="py-5 px-4 text-white font-bold">{item.id}</td>
                      <td className="py-5 px-4 text-white">{item.lote}</td>
                      <td className="py-5 px-4 text-white">{item.proveedor}</td>
                      <td className="py-5 px-4 text-white">{item.clase}</td>
                      <td className="py-5 px-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-bold ${
                          item.evidencia === "VERIFICADO" 
                            ? "bg-green-900/30 text-green-500" 
                            : "bg-red-900/30 text-red-500"
                        }`}>
                          {item.evidencia === "VERIFICADO" ? "●" : "●"} {item.evidencia}
                        </span>
                      </td>
                      <td className="py-5 px-4">
                        <span className={`px-3 py-1 rounded text-sm font-bold ${
                          item.estado === "ACEPTADO" 
                            ? "bg-green-900/30 text-green-500" 
                            : item.estado === "RECHAZADO"
                            ? "bg-red-900/30 text-red-500"
                            : "bg-yellow-900/30 text-yellow-500"
                        }`}>
                          {item.estado}
                        </span>
                      </td>
                      <td className="py-5 px-4">
                        <button className={`px-6 py-3 rounded font-bold text-sm transition-colors min-h-[50px] ${
                          item.accion === "INICIAR RECLAMO"
                            ? "bg-red-600 hover:bg-red-500 text-white"
                            : item.accion === "COMPLETADO"
                            ? "bg-green-600 text-white cursor-default"
                            : "bg-yellow-600 hover:bg-yellow-500 text-white"
                        }`}>
                          {item.accion}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
              <div className="text-gray-400 text-sm">
                MOSTRANDO 3 ENTRADAS ACTIVAS
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded transition-colors min-h-[64px]">
                  Anterior
                </button>
                <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded transition-colors min-h-[64px]">
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}