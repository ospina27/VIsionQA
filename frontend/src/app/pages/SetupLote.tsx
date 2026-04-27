import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, Package, AlertTriangle, Info } from "lucide-react";
import { useInspectionFlow } from "../contexts/InspectionFlowContext";
import { useModal } from "../contexts/ModalContext";
import { useAuth } from "../contexts/AuthContext";

export function SetupLote() {
  const [proveedor, setProveedor] = useState("");
  const [formato, setFormato] = useState("");
  const [tamanoLote, setTamanoLote] = useState("");
  
  const navigate = useNavigate();
  const { completeSetup, loteData } = useInspectionFlow();
  const { showAlert, showConfirm } = useModal();
  const { needsProveedorSelection, isProductor, user } = useAuth();
  
  const esProductor = user?.tipoOrg === 'PRODUCTOR';

  // Auto-asignar proveedor para PRODUCTOR
  useEffect(() => {
    if (isProductor()) {
      setProveedor("PRODUCCIÓN PROPIA");
    }
  }, [isProductor]);

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

  const handleContinue = async () => {
    // Validar proveedor solo si se necesita selección (ABASTECEDOR)
    if (needsProveedorSelection() && !proveedor) {
      await showAlert({
        title: "CAMPO REQUERIDO",
        message: "Debe seleccionar un proveedor antes de continuar.",
        type: "warning",
      });
      return;
    }

    if (!formato) {
      await showAlert({
        title: "CAMPO REQUERIDO",
        message: "Debe seleccionar un formato de envase antes de continuar.",
        type: "warning",
      });
      return;
    }
    
    if (!tamanoLote || Number(tamanoLote) <= 0) {
      await showAlert({
        title: "CAMPO REQUERIDO",
        message: "Debe ingresar un tamaño de lote válido mayor a 0.",
        type: "warning",
      });
      return;
    }

    // Si es Productor y no tiene proveedor asignado, usar "PRODUCCIÓN PROPIA"
    const proveedorFinal = proveedor || "PRODUCCIÓN PROPIA";
    completeSetup(proveedorFinal, formato, Number(tamanoLote));
    navigate("/verificacion");
  };

  const handleCancel = async () => {
    const ok = await showConfirm({
      title: "¿CANCELAR CONFIGURACIÓN?",
      message: "Esto lo regresará al inicio de sesión y perderá la información ingresada.",
      type: "warning",
      confirmText: "SÍ, CANCELAR",
      cancelText: "CONTINUAR AQUÍ",
    });
    if (ok) navigate("/");
  };
  
  const isFormValid = (!needsProveedorSelection() || proveedor) && formato && tamanoLote && Number(tamanoLote) > 0;

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
            {needsProveedorSelection()
              ? "Complete la información del nuevo lote a inspeccionar"
              : "Seleccione el formato de envase y tamaño de producción"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-[#1a1a1a] border-2 border-gray-800 rounded-lg p-6 md:p-10 space-y-6 md:space-y-8">
          {/* Proveedor (solo para ABASTECEDOR) */}
          {needsProveedorSelection() && !esProductor && (
            <div className="space-y-3 md:space-y-4">
              <label className="text-white text-lg md:text-xl font-bold block">
                Seleccione Proveedor <span className="text-[#ef4444]">*</span>
              </label>
              <div className="relative">
                <select
                  value={proveedor}
                  onChange={(e) => setProveedor(e.target.value)}
                  className="w-full bg-[#0a0a0a] text-white border-2 border-gray-700 rounded-lg px-4 md:px-6 py-5 md:py-6 text-base md:text-xl appearance-none cursor-pointer hover:border-gray-600 focus:border-[#3b82f6] transition-colors min-h-[64px] md:min-h-[80px]"
                >
                  <option value="">-- Seleccionar Proveedor --</option>
                  {proveedores.map((prov) => (
                    <option key={prov} value={prov}>{prov}</option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                  size={28}
                />
              </div>
            </div>
          )}

          {/* Formato */}
          <div className="space-y-3 md:space-y-4">
            <label className="text-white text-lg md:text-xl font-bold block">
              Formato de Envase <span className="text-[#ef4444]">*</span>
            </label>
            <div className="relative">
              <select
                value={formato}
                onChange={(e) => setFormato(e.target.value)}
                className="w-full bg-[#0a0a0a] text-white border-2 border-gray-700 rounded-lg px-4 md:px-6 py-5 md:py-6 text-base md:text-xl appearance-none cursor-pointer hover:border-gray-600 focus:border-[#3b82f6] transition-colors min-h-[64px] md:min-h-[80px]"
              >
                <option value="">-- Seleccionar Formato --</option>
                {formatos.map((fmt) => (
                  <option key={fmt} value={fmt}>{fmt}</option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                size={28}
              />
            </div>
          </div>
          
          {/* Tamaño del Lote */}
          <div className="space-y-3 md:space-y-4">
            <label className="text-white text-lg md:text-xl font-bold block">
              {esProductor 
                ? "Tamaño del Lote (unidades totales)" 
                : "Tamaño Total del Lote (para cálculo de muestra)"} <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="number"
              min="1"
              value={tamanoLote}
              onChange={(e) => setTamanoLote(e.target.value)}
              placeholder="Ej: 5000"
              className="w-full bg-[#0a0a0a] text-white border-2 border-gray-700 rounded-lg px-4 md:px-6 py-5 md:py-6 text-base md:text-xl hover:border-gray-600 focus:border-[#3b82f6] focus:outline-none transition-colors min-h-[64px] md:min-h-[80px]"
            />
            <p className="text-xs text-[#71717a] mt-2">
              {esProductor 
                ? "El AQL se calculará sobre el 100% del lote inspeccionado" 
                : "El sistema calculará el tamaño de muestra según ISO 2859-1 Nivel II"}
            </p>
          </div>

          {/* Número de Lote (Auto) */}
          <div className="space-y-3 md:space-y-4">
            <label className="text-white text-lg md:text-xl font-bold block">
              Número de Lote
            </label>
            <div className="bg-[#0a0a0a] border-2 border-gray-700 rounded-lg px-4 md:px-6 py-5 md:py-6 text-gray-400 text-base md:text-xl min-h-[64px] md:min-h-[80px] flex items-center">
              {loteData?.numeroLote || "Se generará automáticamente"}
            </div>
          </div>

          {/* Validación Visual */}
          {!isFormValid && (
            <div className="bg-[#f59e0b]/10 border-2 border-[#f59e0b] rounded-lg p-4 flex items-start gap-3">
              <AlertTriangle size={24} className="text-[#f59e0b] flex-shrink-0 mt-0.5" />
              <div className="text-[#f59e0b] font-['Space_Grotesk'] text-sm">
                <span className="font-bold">CAMPOS REQUERIDOS:</span> Debe completar todos los campos obligatorios (*) antes de continuar
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-white font-bold rounded-lg py-5 md:py-6 text-lg md:text-xl transition-colors min-h-[64px] md:min-h-[80px]"
          >
            Cancelar
          </button>
          <button
            onClick={handleContinue}
            disabled={!isFormValid}
            className="flex-1 bg-[#3b82f6] hover:bg-[#2563eb] active:bg-[#1d4ed8] text-white font-bold rounded-lg py-5 md:py-6 text-lg md:text-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[64px] md:min-h-[80px]"
          >
            Iniciar Verificación del Sistema
          </button>
        </div>
        
        {/* Informativo AQL */}
        <div className="text-center flex items-center justify-center gap-2">
          <Info size={14} className="text-[#52525b]" />
          <p className="text-xs text-[#52525b]">
            AQL configurado: 1.0% — Modificable solo por el Administrador
          </p>
        </div>
      </div>
    </div>
  );
}