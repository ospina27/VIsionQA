import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, Package } from "lucide-react";

export function SetupLote() {
  const [proveedor, setProveedor] = useState("");
  const [formato, setFormato] = useState("");
  const navigate = useNavigate();

  const proveedores = [
    "CORE-TEK INC",
    "ZENITH-SYSTEMS",
    "PLASTIMAX INDUSTRIES",
    "ENVAPRO SOLUTIONS",
  ];

  const formatos = [
    "Tarro 250ml - Cuello Ancho",
    "Tarro 500ml - Cuello Estándar",
    "Tarro 1L - Industrial",
    "Tarro 2L - Bidón",
  ];

  const handleContinue = () => {
    if (proveedor && formato) {
      navigate("/calibracion");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 md:p-8">
      <div className="max-w-4xl w-full space-y-8 md:space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 md:space-y-4">
          <div className="flex items-center justify-center gap-4 mb-4 md:mb-6">
            <Package size={40} className="text-[#3b82f6] md:w-12 md:h-12" />
          </div>
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold px-4">
            CONFIGURACIÓN DE LOTE
          </h1>
          <p className="text-gray-400 text-base md:text-lg lg:text-xl px-4">
            Complete la información del nuevo lote a inspeccionar
          </p>
        </div>

        {/* Form */}
        <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-6 md:p-10 space-y-6 md:space-y-8">
          {/* Proveedor */}
          <div className="space-y-3 md:space-y-4">
            <label className="text-white text-lg md:text-xl font-bold block">
              Seleccione Proveedor
            </label>
            <div className="relative">
              <select
                value={proveedor}
                onChange={(e) => setProveedor(e.target.value)}
                className="w-full bg-[#0a0a0a] text-white border-2 border-gray-700 rounded-lg px-4 md:px-6 py-5 md:py-6 text-base md:text-xl appearance-none cursor-pointer hover:border-gray-600 transition-colors min-h-[64px] md:min-h-[80px]"
              >
                <option value="">-- Seleccionar Proveedor --</option>
                {proveedores.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
              <ChevronDown 
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" 
                size={28}
              />
            </div>
          </div>

          {/* Formato */}
          <div className="space-y-3 md:space-y-4">
            <label className="text-white text-lg md:text-xl font-bold block">
              Formato de Envase
            </label>
            <div className="relative">
              <select
                value={formato}
                onChange={(e) => setFormato(e.target.value)}
                className="w-full bg-[#0a0a0a] text-white border-2 border-gray-700 rounded-lg px-4 md:px-6 py-5 md:py-6 text-base md:text-xl appearance-none cursor-pointer hover:border-gray-600 transition-colors min-h-[64px] md:min-h-[80px]"
              >
                <option value="">-- Seleccionar Formato --</option>
                {formatos.map((fmt) => (
                  <option key={fmt} value={fmt}>
                    {fmt}
                  </option>
                ))}
              </select>
              <ChevronDown 
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" 
                size={28}
              />
            </div>
          </div>

          {/* Número de Lote (Auto) */}
          <div className="space-y-3 md:space-y-4">
            <label className="text-white text-lg md:text-xl font-bold block">
              Número de Lote
            </label>
            <div className="bg-[#0a0a0a] border-2 border-gray-700 rounded-lg px-4 md:px-6 py-5 md:py-6 text-gray-400 text-base md:text-xl min-h-[64px] md:min-h-[80px] flex items-center">
              Se generará automáticamente
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-bold rounded-lg py-5 md:py-6 text-lg md:text-xl transition-colors min-h-[64px] md:min-h-[80px]"
          >
            Cancelar
          </button>
          <button
            onClick={handleContinue}
            disabled={!proveedor || !formato}
            className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] active:bg-[#1d4ed8] text-white font-bold rounded-lg py-5 md:py-6 text-lg md:text-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[64px] md:min-h-[80px]"
          >
            Iniciar Calibración de Cámara
          </button>
        </div>
      </div>
    </div>
  );
}