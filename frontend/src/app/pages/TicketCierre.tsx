import { useNavigate } from "react-router";
import { CheckCircle, Download, RotateCw, FileText, Clock, TrendingUp } from "lucide-react";

export function TicketCierre() {
  const navigate = useNavigate();

  const loteData = {
    numero: "#B-8842-DELTA",
    proveedor: "CORE-TEK INC",
    formato: "Tarro 500ml - Cuello Estándar",
    tiempo: "2h 15m",
    total: 8456,
    aceptados: 8330,
    rechazados: 126,
    rendimiento: 98.5,
    operario: "F. RODRÍGUEZ",
  };

  const handleExportPDF = () => {
    alert("Generando PDF con evidencia fotográfica...");
  };

  const handleNuevoLote = () => {
    navigate("/setup");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="max-w-4xl w-full space-y-6 md:space-y-10 py-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle size={64} className="text-green-500 md:w-20 md:h-20" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-3 md:space-y-4 px-4">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold">
            Inspección Finalizada
          </h1>
          <p className="text-gray-400 text-lg md:text-xl lg:text-2xl">
            Lote {loteData.numero}
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-6 md:p-10 space-y-6 md:space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center space-y-2 p-4 bg-[#0a0a0a] rounded-lg">
              <Clock size={28} className="text-gray-400 mx-auto md:w-8 md:h-8" />
              <div className="text-gray-400 text-xs md:text-sm">TIEMPO</div>
              <div className="text-white text-2xl md:text-3xl font-bold">{loteData.tiempo}</div>
            </div>
            
            <div className="text-center space-y-2 p-4 bg-[#0a0a0a] rounded-lg">
              <TrendingUp size={28} className="text-green-500 mx-auto md:w-8 md:h-8" />
              <div className="text-gray-400 text-xs md:text-sm">RENDIMIENTO</div>
              <div className="text-green-500 text-2xl md:text-3xl font-bold">{loteData.rendimiento}%</div>
            </div>
            
            <div className="text-center space-y-2 p-4 bg-[#0a0a0a] rounded-lg">
              <FileText size={28} className="text-gray-400 mx-auto md:w-8 md:h-8" />
              <div className="text-gray-400 text-xs md:text-sm">TOTAL</div>
              <div className="text-white text-2xl md:text-3xl font-bold">{loteData.total.toLocaleString()}</div>
            </div>
          </div>

          <div className="border-t border-gray-800" />

          {/* Detailed Info */}
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8 md:gap-y-6 text-sm md:text-base lg:text-lg">
              <div className="flex justify-between p-3 md:p-0">
                <span className="text-gray-400">Proveedor:</span>
                <span className="text-white font-bold">{loteData.proveedor}</span>
              </div>
              
              <div className="flex justify-between p-3 md:p-0">
                <span className="text-gray-400">Formato:</span>
                <span className="text-white font-bold text-right">{loteData.formato}</span>
              </div>
              
              <div className="flex justify-between p-3 md:p-0">
                <span className="text-gray-400">Aceptadas:</span>
                <span className="text-green-500 font-bold">{loteData.aceptados.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between p-3 md:p-0">
                <span className="text-gray-400">Rechazadas:</span>
                <span className="text-red-500 font-bold">{loteData.rechazados.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between p-3 md:p-0">
                <span className="text-gray-400">Tasa Defectos:</span>
                <span className="text-green-500 font-bold">
                  {((loteData.rechazados / loteData.total) * 100).toFixed(2)}%
                </span>
              </div>
              
              <div className="flex justify-between p-3 md:p-0">
                <span className="text-gray-400">Estado AQL:</span>
                <span className="text-green-500 font-bold">✓ APROBADO</span>
              </div>
              
              <div className="flex justify-between md:col-span-2 p-3 md:p-0">
                <span className="text-gray-400">Operario:</span>
                <span className="text-white font-bold">{loteData.operario}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800" />

          {/* Compliance */}
          <div className="bg-green-900/20 border border-green-500 rounded-lg p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4">
              <CheckCircle size={28} className="text-green-500 flex-shrink-0 md:w-8 md:h-8" />
              <div>
                <div className="text-green-500 font-bold text-lg md:text-xl">Cumple con ISO 2859-1</div>
                <div className="text-gray-400 text-xs md:text-sm mt-1">
                  Nivel de Calidad Aceptable (AQL) 1.0% - APROBADO
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <button
            onClick={handleExportPDF}
            className="bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-bold rounded-lg py-5 md:py-6 text-base md:text-lg lg:text-xl transition-colors flex items-center justify-center gap-2 md:gap-3 min-h-[64px] md:min-h-[80px]"
          >
            <Download size={24} className="md:w-7 md:h-7" />
            Exportar PDF
          </button>
          
          <button
            onClick={handleNuevoLote}
            className="bg-[#ff6b6b] hover:bg-[#ff5555] active:bg-[#ff4444] text-white font-bold rounded-lg py-5 md:py-6 text-base md:text-lg lg:text-xl transition-colors flex items-center justify-center gap-2 md:gap-3 min-h-[64px] md:min-h-[80px]"
          >
            <RotateCw size={24} className="md:w-7 md:h-7" />
            Iniciar Nuevo Lote
          </button>
        </div>

        {/* Footer */}
        <div className="text-center px-4">
          <button
            onClick={() => navigate("/admin")}
            className="text-gray-500 hover:text-gray-400 underline text-sm md:text-base lg:text-lg transition-colors"
          >
            Ver Dashboard Administrativo
          </button>
        </div>
      </div>
    </div>
  );
}