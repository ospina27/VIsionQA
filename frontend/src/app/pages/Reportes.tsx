import { useState } from "react";
import { SidebarVisionQA } from "../components/SidebarVisionQA";
import { HelpCenter } from "../components/HelpCenter";
import { useModal } from "../contexts/ModalContext";
import { useAuth } from "../contexts/AuthContext";
import {
  FileText,
  Package,
  CheckCircle,
  XCircle,
  Filter,
  Search
} from "lucide-react";

type Tab = "LOTES";

export function Reportes() {
  const [activeTab, setActiveTab] = useState<Tab>("LOTES");
  const [searchLote, setSearchLote] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const [filtroProveedor, setFiltroProveedor] = useState<string>("TODOS");
  const [filtroEstado, setFiltroEstado] = useState<"TODOS"|"APROBADO"|"RECHAZADO">("TODOS");
  const [filtroFecha, setFiltroFecha] = useState<string>("");

  const { showAlert } = useModal();
  const { user, isProductor } = useAuth();
  
  const esProductor = user?.tipoOrg === 'PRODUCTOR' || isProductor();

  const handleVerPDF = async (loteId: string) => {
    await showAlert({
      title: "CERTIFICADO DE INSPECCIÓN",
      message: `Abriendo certificado ISO 2859-1 del lote ${loteId}`,
      detail: `Archivo: CERT_${loteId}_VisionQA.pdf\nNorma: ISO 2859-1:2024\nEstado: Firmado digitalmente`,
      type: "info",
      confirmText: "ENTENDIDO",
    });
  };

  const lotesData = [
    {
      id: "LT-2024-489",
      fecha: "19 MAR 2026",
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
      fecha: "19 MAR 2026",
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
      fecha: "19 MAR 2026",
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
      fecha: "19 MAR 2026",
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

  const proveedoresUnicos = ["TODOS", ...Array.from(
    new Set(lotesData.map(l => l.proveedor))
  )];

  const tabs = [
    { id: "LOTES" as Tab, label: "Lotes Procesados", icon: Package }
  ];

  const lotesFiltrados = lotesData.filter(lote => {
    const matchSearch = searchLote === "" ||
      lote.id.toLowerCase().includes(searchLote.toLowerCase()) ||
      (!esProductor && lote.proveedor.toLowerCase().includes(searchLote.toLowerCase()));
    
    const matchEstado = filtroEstado === "TODOS" ||
      lote.estado === filtroEstado;
    
    const matchProveedor = esProductor || 
      filtroProveedor === "TODOS" ||
      lote.proveedor === filtroProveedor;
    
    const matchFecha = filtroFecha === "" ||
      lote.fecha.toLowerCase().includes(filtroFecha.toLowerCase());
    
    return matchSearch && matchEstado && matchProveedor && matchFecha;
  });

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <SidebarVisionQA active="reportes" />

      <div className="flex-1 flex flex-col ml-16 xl:ml-56 pt-14 xl:pt-16">
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
            <HelpCenter />
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
          {/* LOTES TAB */}
          {activeTab === "LOTES" && (
            <>
              {/* Search and Filters */}
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-4">
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 relative">
                    <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder={esProductor ? "Buscar por ID de lote..." : "Buscar por ID de lote o proveedor..."}
                      value={searchLote}
                      onChange={(e) => setSearchLote(e.target.value)}
                      className="w-full bg-[#2a2a2a] border border-gray-700 text-white pl-12 pr-4 py-3 rounded font-['Inter'] text-sm focus:outline-none focus:border-[#ef4444]"
                    />
                  </div>
                  <button
                    className={`flex items-center gap-2 px-6 py-3 rounded font-['Space_Grotesk'] font-bold text-sm transition-colors border ${showFilters ? "bg-[#3b82f6] border-[#3b82f6] text-white" : "bg-[#2a2a2a] border-gray-700 text-white hover:bg-[#3a3a3a]"}`}
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter size={18} />
                    FILTROS
                  </button>
                </div>

                {showFilters && (
                  <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 mb-4 space-y-4">
                    {/* FILA 1 — Filtro por Estado */}
                    <div>
                      <div className="text-xs text-[#71717a] mb-2">Estado</div>
                      <div className="flex gap-2">
                        {(["TODOS", "APROBADO", "RECHAZADO"] as const).map(estado => (
                          <button
                            key={estado}
                            onClick={() => setFiltroEstado(estado)}
                            className={`px-4 py-2 rounded text-xs font-bold font-['Space_Grotesk'] transition-colors ${filtroEstado === estado ? "bg-[#3b82f6] text-white" : "bg-[#2a2a2a] text-[#71717a] hover:bg-[#3a3a3a]"}`}
                          >
                            {estado}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* FILA 2 — Filtro por Proveedor */}
                    {!esProductor && (
                      <div>
                        <div className="text-xs text-[#71717a] mb-2">Proveedor</div>
                        <div className="flex gap-2 flex-wrap">
                          {proveedoresUnicos.map(prov => (
                            <button
                              key={prov}
                              onClick={() => setFiltroProveedor(prov)}
                              className={`px-4 py-2 rounded text-xs font-bold font-['Space_Grotesk'] transition-colors ${filtroProveedor === prov ? "bg-[#3b82f6] text-white" : "bg-[#2a2a2a] text-[#71717a] hover:bg-[#3a3a3a]"}`}
                            >
                              {prov.replace(/_/g, ' ')}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* FILA 3 — Filtro por Fecha */}
                    <div>
                      <div className="text-xs text-[#71717a] mb-2">Fecha</div>
                      <input
                        type="text"
                        placeholder="Ej: 19 MAR 2026"
                        value={filtroFecha}
                        onChange={(e) => setFiltroFecha(e.target.value)}
                        className="bg-[#2a2a2a] border border-gray-700 text-white px-3 py-2 rounded text-sm font-['Liberation_Mono'] focus:outline-none focus:border-[#3b82f6]"
                      />
                    </div>

                    {/* Botón Limpiar */}
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setFiltroProveedor("TODOS");
                          setFiltroEstado("TODOS");
                          setFiltroFecha("");
                          setSearchLote("");
                        }}
                        className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#71717a] text-xs px-4 py-2 rounded transition-colors"
                      >
                        LIMPIAR FILTROS
                      </button>
                    </div>
                  </div>
                )}
                
                {(showFilters || searchLote !== "") && lotesFiltrados.length < lotesData.length && (
                  <div className="text-xs text-[#71717a]">
                    Mostrando {lotesFiltrados.length} de {lotesData.length} lotes
                  </div>
                )}
              </div>

              {/* Lotes Table */}
              <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#2a2a2a]">
                    <tr>
                      <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">ID Lote</th>
                      {!esProductor && <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Proveedor</th>}
                      <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Fecha / Horario</th>
                      <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Unidades</th>
                      <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Defectos</th>
                      <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Tasa</th>
                      <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Estado</th>
                      <th className="text-left px-6 py-4 text-[#71717a] font-['Space_Grotesk'] font-bold text-xs uppercase">Certificado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lotesFiltrados.map((lote, idx) => (
                      <tr key={lote.id} className={idx % 2 === 0 ? "bg-[#1a1a1a]" : "bg-[#1f1f1f]"}>
                        <td className="px-6 py-5 text-white font-['Liberation_Mono'] font-bold">
                          {lote.id}
                        </td>
                        {!esProductor && (
                          <td className="px-6 py-5 text-[#a1a1aa] font-['Inter']">
                            {lote.proveedor}
                          </td>
                        )}
                        <td className="px-6 py-5">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[#71717a] font-['Liberation_Mono'] text-xs">
                              {lote.fecha}
                            </span>
                            <span className="text-[#a1a1aa] font-['Liberation_Mono'] text-sm">
                              {lote.horaInicio} → {lote.horaFin}
                            </span>
                          </div>
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
                        <td className="px-6 py-5">
                          <button
                            onClick={() => handleVerPDF(lote.id)}
                            className="flex items-center gap-1.5 bg-[#1e3a8a] hover:bg-[#1d4ed8] border border-[#3b82f6]/40 text-[#93c5fd] font-['Space_Grotesk'] font-bold text-xs px-3 py-2 rounded transition-colors"
                          >
                            <FileText size={14} />
                            VER PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}