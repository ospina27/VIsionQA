import { useState } from "react";
import { SidebarVisionQA } from "../components/SidebarVisionQA";
import {
  Download,
  FileText,
  TrendingUp,
  TrendingDown,
  Package,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Users,
  Calendar,
  BarChart3,
  Filter,
  Search
} from "lucide-react";

type Tab = "RESUMEN" | "DEFECTOS" | "LOTES" | "ESTADISTICAS";

export function Reportes() {
  const [activeTab, setActiveTab] = useState<Tab>("RESUMEN");
  const [selectedDate, setSelectedDate] = useState("HOY");
  const [searchLote, setSearchLote] = useState("");

  // Mock data - En producción viene de la base de datos
  const turnoData = {
    fecha: "19 MAR 2026",
    turno: "TURNO_A (06:00 - 14:00)",
    operario: "Carlos Rodríguez - LEG-4482",
    estacion: "ESTACIÓN_04",
    totalInspeccionado: 14208,
    totalDefectos: 341,
    tasaDefectos: 2.4,
    lotesProcesados: 8,
    lotesAprobados: 6,
    lotesRechazados: 2,
    tiempoOperativo: "7h 45min",
    pausas: 3,
    alertasGeneradas: 12
  };

  const lotesData = [
    {
      id: "LT-2024-489",
      proveedor: "PLASTICOS_DEL_SUR",
      horaInicio: "06:15",
      horaFin: "08:30",
      totalUnidades: 2500,
      defectos: 95,
      tasaDefectos: 3.8,
      estado: "RECHAZADO",
      razon: "Superó AQL 1.0%"
    },
    {
      id: "LT-2024-490",
      proveedor: "ENVASES_NORTE_SA",
      horaInicio: "08:45",
      horaFin: "10:20",
      totalUnidades: 2100,
      defectos: 15,
      tasaDefectos: 0.71,
      estado: "APROBADO",
      razon: "Dentro de AQL"
    },
    {
      id: "LT-2024-491",
      proveedor: "PLASTICOS_DEL_SUR",
      horaInicio: "10:35",
      horaFin: "12:10",
      totalUnidades: 1980,
      defectos: 12,
      tasaDefectos: 0.61,
      estado: "APROBADO",
      razon: "Dentro de AQL"
    },
    {
      id: "LT-2024-492",
      proveedor: "INDUSTRIAS_CRESPO",
      horaInicio: "12:25",
      horaFin: "13:45",
      totalUnidades: 1650,
      defectos: 8,
      tasaDefectos: 0.48,
      estado: "APROBADO",
      razon: "Dentro de AQL"
    }
  ];

  const defectosTop = [
    { tipo: "QUEMADURA_TÉRMICA", cantidad: 142, porcentaje: 41.6, tendencia: "up" },
    { tipo: "RAYA_PROFUNDA", cantidad: 98, porcentaje: 28.7, tendencia: "down" },
    { tipo: "DEFORMACIÓN", cantidad: 56, porcentaje: 16.4, tendencia: "up" },
    { tipo: "BURBUJA_INTERNA", cantidad: 45, porcentaje: 13.2, tendencia: "stable" }
  ];

  const tabs = [
    { id: "RESUMEN" as Tab, label: "Resumen del Turno", icon: FileText },
    { id: "DEFECTOS" as Tab, label: "Análisis de Defectos", icon: AlertTriangle },
    { id: "LOTES" as Tab, label: "Lotes Procesados", icon: Package },
    { id: "ESTADISTICAS" as Tab, label: "Estadísticas", icon: BarChart3 }
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <SidebarVisionQA active="reportes" />

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
                  REPORTES_Y_AUDITORÍA
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-[#10b981] hover:bg-[#059669] text-white font-['Space_Grotesk'] font-bold px-6 py-3 rounded transition-colors">
              <Download size={18} />
              EXPORTAR PDF
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
          {/* RESUMEN TAB */}
          {activeTab === "RESUMEN" && (
            <>
              {/* Header Info */}
              <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-2 border-gray-800 rounded-lg p-6">
                <div className="grid grid-cols-4 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-[#71717a] text-xs mb-2">
                      <Calendar size={16} />
                      FECHA Y TURNO
                    </div>
                    <div className="text-white font-['Space_Grotesk'] font-bold text-lg">
                      {turnoData.fecha}
                    </div>
                    <div className="text-[#a1a1aa] text-sm">{turnoData.turno}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[#71717a] text-xs mb-2">
                      <Users size={16} />
                      OPERARIO
                    </div>
                    <div className="text-white font-['Space_Grotesk'] font-bold text-lg">
                      {turnoData.operario.split(" - ")[0]}
                    </div>
                    <div className="text-[#a1a1aa] text-sm">{turnoData.operario.split(" - ")[1]}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[#71717a] text-xs mb-2">
                      <Clock size={16} />
                      TIEMPO OPERATIVO
                    </div>
                    <div className="text-white font-['Space_Grotesk'] font-bold text-lg">
                      {turnoData.tiempoOperativo}
                    </div>
                    <div className="text-[#a1a1aa] text-sm">{turnoData.pausas} pausas programadas</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[#71717a] text-xs mb-2">
                      <FileText size={16} />
                      ESTACIÓN
                    </div>
                    <div className="text-white font-['Space_Grotesk'] font-bold text-lg">
                      {turnoData.estacion}
                    </div>
                    <div className="text-[#a1a1aa] text-sm">VisionQA v2.1</div>
                  </div>
                </div>
              </div>

              {/* KPIs Grid */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-[#10b981]/20 rounded-lg">
                      <Package size={24} className="text-[#10b981]" />
                    </div>
                    <div>
                      <div className="text-[#71717a] text-xs uppercase">Total Inspeccionado</div>
                      <div className="text-white font-['Space_Grotesk'] font-bold text-2xl">
                        {turnoData.totalInspeccionado.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-[#a1a1aa] text-xs">Unidades procesadas</div>
                </div>

                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-[#ef4444]/20 rounded-lg">
                      <XCircle size={24} className="text-[#ef4444]" />
                    </div>
                    <div>
                      <div className="text-[#71717a] text-xs uppercase">Defectos Detectados</div>
                      <div className="text-[#ef4444] font-['Space_Grotesk'] font-bold text-2xl">
                        {turnoData.totalDefectos}
                      </div>
                    </div>
                  </div>
                  <div className="text-[#a1a1aa] text-xs">Tasa: {turnoData.tasaDefectos}%</div>
                </div>

                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-[#10b981]/20 rounded-lg">
                      <CheckCircle size={24} className="text-[#10b981]" />
                    </div>
                    <div>
                      <div className="text-[#71717a] text-xs uppercase">Lotes Aprobados</div>
                      <div className="text-[#10b981] font-['Space_Grotesk'] font-bold text-2xl">
                        {turnoData.lotesAprobados}/{turnoData.lotesProcesados}
                      </div>
                    </div>
                  </div>
                  <div className="text-[#a1a1aa] text-xs">{((turnoData.lotesAprobados / turnoData.lotesProcesados) * 100).toFixed(1)}% tasa de aprobación</div>
                </div>

                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-[#f59e0b]/20 rounded-lg">
                      <AlertTriangle size={24} className="text-[#f59e0b]" />
                    </div>
                    <div>
                      <div className="text-[#71717a] text-xs uppercase">Alertas Generadas</div>
                      <div className="text-[#f59e0b] font-['Space_Grotesk'] font-bold text-2xl">
                        {turnoData.alertasGeneradas}
                      </div>
                    </div>
                  </div>
                  <div className="text-[#a1a1aa] text-xs">Todas resueltas</div>
                </div>
              </div>

              {/* Quick Summary */}
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-6">
                <h3 className="text-white font-['Space_Grotesk'] font-bold text-xl mb-4">
                  RESUMEN EJECUTIVO
                </h3>
                <div className="space-y-3 text-[#d4d4d8] font-['Inter'] text-base leading-relaxed">
                  <p>
                    ✅ <strong>Cumplimiento general:</strong> El turno procesó {turnoData.totalInspeccionado.toLocaleString()} unidades en {turnoData.tiempoOperativo}, 
                    con una tasa de defectos del {turnoData.tasaDefectos}% (por encima del AQL 1.0%).
                  </p>
                  <p>
                    ⚠️ <strong>Lotes rechazados:</strong> {turnoData.lotesRechazados} lotes fueron rechazados por superar el nivel de calidad aceptable. 
                    Ver sección "Lotes Procesados" para detalles.
                  </p>
                  <p>
                    📊 <strong>Defecto principal:</strong> QUEMADURA_TÉRMICA representa el 41.6% de los defectos detectados. 
                    Revisar parámetros de temperatura en la línea de producción.
                  </p>
                  <p>
                    🔧 <strong>Alertas:</strong> Se generaron {turnoData.alertasGeneradas} alertas durante el turno (lente sucio, red intermitente), 
                    todas fueron resueltas siguiendo los SOPs correspondientes.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* DEFECTOS TAB */}
          {activeTab === "DEFECTOS" && (
            <>
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white font-['Space_Grotesk'] font-bold text-2xl">
                    ANÁLISIS DE DEFECTOS - TOP 4
                  </h2>
                  <div className="text-[#71717a] font-['Space_Grotesk'] text-sm">
                    Total: {turnoData.totalDefectos} defectos
                  </div>
                </div>

                <div className="space-y-4">
                  {defectosTop.map((defecto, idx) => (
                    <div key={defecto.tipo} className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#ef4444] text-white font-bold text-lg">
                            {idx + 1}
                          </div>
                          <div>
                            <h3 className="text-white font-['Space_Grotesk'] font-bold text-lg">
                              {defecto.tipo}
                            </h3>
                            <div className="text-[#71717a] text-sm">
                              {defecto.cantidad} unidades detectadas
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-[#ef4444] font-['Space_Grotesk'] font-bold text-2xl">
                              {defecto.porcentaje}%
                            </div>
                            <div className="text-[#71717a] text-xs">del total</div>
                          </div>
                          {defecto.tendencia === "up" && <TrendingUp size={24} className="text-[#ef4444]" />}
                          {defecto.tendencia === "down" && <TrendingDown size={24} className="text-[#10b981]" />}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="relative w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full bg-[#ef4444] rounded-full"
                          style={{ width: `${defecto.porcentaje}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recomendaciones */}
              <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#f59e0b] rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle size={32} className="text-[#f59e0b] flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-['Space_Grotesk'] font-bold text-xl mb-3">
                      RECOMENDACIONES DE MEJORA
                    </h3>
                    <ul className="space-y-2 text-[#d4d4d8] font-['Inter'] text-base">
                      <li>🔥 <strong>Quemadura Térmica:</strong> Verificar temperatura de molde (debe estar entre 180-200°C)</li>
                      <li>🔍 <strong>Raya Profunda:</strong> Inspeccionar rodillos transportadores por desgaste o partículas</li>
                      <li>⚙️ <strong>Deformación:</strong> Revisar presión de inyección y tiempo de enfriamiento</li>
                      <li>💧 <strong>Burbuja Interna:</strong> Validar contenido de humedad en resina (debe ser &lt;0.02%)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* LOTES TAB */}
          {activeTab === "LOTES" && (
            <>
              {/* Search and Filters */}
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-4">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar por ID de lote o proveedor..."
                      value={searchLote}
                      onChange={(e) => setSearchLote(e.target.value)}
                      className="w-full bg-[#2a2a2a] border border-gray-700 text-white pl-12 pr-4 py-3 rounded font-['Inter'] text-sm focus:outline-none focus:border-[#ef4444]"
                    />
                  </div>
                  <button className="flex items-center gap-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] border border-gray-700 text-white px-6 py-3 rounded font-['Space_Grotesk'] font-bold text-sm transition-colors">
                    <Filter size={18} />
                    FILTROS
                  </button>
                </div>
              </div>

              {/* Lotes Table */}
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#2a2a2a]">
                    <tr>
                      <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">ID Lote</th>
                      <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Proveedor</th>
                      <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Horario</th>
                      <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Unidades</th>
                      <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Defectos</th>
                      <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Tasa</th>
                      <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lotesData
                      .filter(lote => 
                        lote.id.toLowerCase().includes(searchLote.toLowerCase()) ||
                        lote.proveedor.toLowerCase().includes(searchLote.toLowerCase())
                      )
                      .map((lote, idx) => (
                        <tr key={lote.id} className={idx % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#1f1f1f]"}>
                          <td className="px-6 py-5 text-white font-['Liberation_Mono'] font-bold">
                            {lote.id}
                          </td>
                          <td className="px-6 py-5 text-[#a1a1aa] font-['Inter']">
                            {lote.proveedor}
                          </td>
                          <td className="px-6 py-5 text-[#a1a1aa] font-['Liberation_Mono'] text-sm">
                            {lote.horaInicio} - {lote.horaFin}
                          </td>
                          <td className="px-6 py-5 text-white font-['Space_Grotesk'] font-bold">
                            {lote.totalUnidades.toLocaleString()}
                          </td>
                          <td className="px-6 py-5 text-[#ef4444] font-['Space_Grotesk'] font-bold">
                            {lote.defectos}
                          </td>
                          <td className="px-6 py-5">
                            <span className={`font-['Space_Grotesk'] font-bold text-lg ${
                              lote.tasaDefectos > 1.0 ? "text-[#ef4444]" :
                              lote.tasaDefectos > 0.5 ? "text-[#f1c100]" :
                              "text-[#10b981]"
                            }`}>
                              {lote.tasaDefectos}%
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex flex-col gap-1">
                              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-bold w-fit ${
                                lote.estado === "APROBADO"
                                  ? "bg-[#10b981]/20 text-[#10b981]"
                                  : "bg-[#ef4444]/20 text-[#ef4444]"
                              }`}>
                                {lote.estado === "APROBADO" ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                {lote.estado}
                              </span>
                              <span className="text-[#71717a] text-xs">{lote.razon}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ESTADISTICAS TAB */}
          {activeTab === "ESTADISTICAS" && (
            <>
              <div className="grid grid-cols-2 gap-6">
                {/* Comparativa Semanal */}
                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-6">
                  <h3 className="text-white font-['Space_Grotesk'] font-bold text-xl mb-4">
                    COMPARATIVA SEMANAL
                  </h3>
                  <div className="space-y-3">
                    {[
                      { dia: "Lunes", tasa: 1.8, unidades: 13500 },
                      { dia: "Martes", tasa: 2.1, unidades: 14100 },
                      { dia: "Miércoles", tasa: 1.9, unidades: 13800 },
                      { dia: "Jueves", tasa: 2.4, unidades: 14208, actual: true },
                      { dia: "Viernes", tasa: 0, unidades: 0, futuro: true }
                    ].map((dia) => (
                      <div key={dia.dia} className={`flex items-center justify-between p-3 rounded ${
                        dia.actual ? "bg-[#ef4444]/20 border border-[#ef4444]" :
                        dia.futuro ? "opacity-30" : "bg-[#2a2a2a]"
                      }`}>
                        <div>
                          <div className={`font-['Space_Grotesk'] font-bold ${
                            dia.actual ? "text-[#ef4444]" : "text-white"
                          }`}>
                            {dia.dia} {dia.actual && "(HOY)"}
                          </div>
                          {!dia.futuro && (
                            <div className="text-[#71717a] text-sm">
                              {dia.unidades.toLocaleString()} unidades
                            </div>
                          )}
                        </div>
                        {!dia.futuro && (
                          <div className={`font-['Space_Grotesk'] font-bold text-xl ${
                            dia.tasa > 2.0 ? "text-[#ef4444]" :
                            dia.tasa > 1.0 ? "text-[#f1c100]" :
                            "text-[#10b981]"
                          }`}>
                            {dia.tasa}%
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance por Proveedor */}
                <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-6">
                  <h3 className="text-white font-['Space_Grotesk'] font-bold text-xl mb-4">
                    PERFORMANCE POR PROVEEDOR
                  </h3>
                  <div className="space-y-4">
                    {[
                      { nombre: "ENVASES_NORTE_SA", calidad: 98.5, lotes: 4 },
                      { nombre: "INDUSTRIAS_CRESPO", calidad: 97.2, lotes: 3 },
                      { nombre: "PLASTICOS_DEL_SUR", calidad: 94.8, lotes: 6 }
                    ].map((prov) => (
                      <div key={prov.nombre} className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-white font-['Space_Grotesk'] font-bold">
                            {prov.nombre}
                          </div>
                          <div className="text-[#10b981] font-['Space_Grotesk'] font-bold text-xl">
                            {prov.calidad}%
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="text-[#71717a]">{prov.lotes} lotes procesados</div>
                          <div className="relative w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full bg-[#10b981] rounded-full"
                              style={{ width: `${prov.calidad}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cumplimiento ISO */}
              <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border-2 border-[#10b981] rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <CheckCircle size={32} className="text-[#10b981]" />
                  <h3 className="text-white font-['Space_Grotesk'] font-bold text-xl">
                    CUMPLIMIENTO ISO 2859-1
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-[#71717a] text-xs mb-2">NIVEL DE INSPECCIÓN</div>
                    <div className="text-white font-['Space_Grotesk'] font-bold text-lg">Nivel II</div>
                  </div>
                  <div>
                    <div className="text-[#71717a] text-xs mb-2">AQL ESTABLECIDO</div>
                    <div className="text-white font-['Space_Grotesk'] font-bold text-lg">1.0%</div>
                  </div>
                  <div>
                    <div className="text-[#71717a] text-xs mb-2">CUMPLIMIENTO</div>
                    <div className="text-[#10b981] font-['Space_Grotesk'] font-bold text-lg">75% Aprobados</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}