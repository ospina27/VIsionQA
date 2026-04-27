import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { NumPad } from "../components/NumPad";
import { CreditCard, Shield, User, Building2, Package, ClipboardCheck } from "lucide-react";
import { OlvidoCarnetModal } from "../components/OlvidoCarnetModal";
import { useAuth, RolAcceso, TipoOrganizacion } from "../contexts/AuthContext";
import { useInspectionFlow } from "../contexts/InspectionFlowContext";

export function LoginOperativo() {
  const [pin, setPin] = useState("");
  const [showOlvidoCarnet, setShowOlvidoCarnet] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RolAcceso | null>(null);
  const [selectedOrg, setSelectedOrg] = useState<TipoOrganizacion | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { completeLogin, startLogin } = useInspectionFlow();

  // Inicializar el flujo al montar el componente
  useEffect(() => {
    startLogin();
  }, []);

  const handleRoleSelect = (role: RolAcceso) => {
    setSelectedRole(role);
    setError(null);
    
    // Auto-select organization based on restrictions if not already correctly selected
    if (role === "ANALISTA_CALIDAD") {
      setSelectedOrg("ABASTECEDOR");
    } else if (role === "OPERARIO") {
      setSelectedOrg("PRODUCTOR");
    } else if (role === "ADMINISTRADOR") {
      // Por defecto para administrador (o mantener la selección si ya era válida)
      if (!selectedOrg) {
        setSelectedOrg("ABASTECEDOR");
      }
    }
  };

  const handleSubmit = () => {
    setError(null);

    if (!selectedRole) {
      setError("Debe seleccionar un tipo de acceso antes de continuar");
      return;
    }

    if (!selectedOrg) {
      setError("Debe seleccionar un tipo de organización antes de continuar");
      return;
    }

    // Validar longitud mínima del PIN
    if (pin.length < 4) {
      setError("El PIN debe tener al menos 4 dígitos");
      return;
    }

    // Simular validación de PIN
    if (pin === "0000") {
      setError("PIN inválido. Intente nuevamente");
      return;
    }

    // Autenticación exitosa
    if (selectedRole === "ADMINISTRADOR") {
      login("ADMIN-001", "SUPERVISOR PRINCIPAL", "ADMINISTRADOR", selectedOrg);
      completeLogin();
      navigate("/reportes");
    } else {
      login("OPR-" + pin, "F. RODRIGUEZ", selectedRole, selectedOrg, "LEG-4482");
      completeLogin();
      navigate("/setup");
    }
  };

  const handleOlvidoCarnetConfirm = (data: { nombre: string; legajo: string; codigoSupervisor: string }) => {
    if (data.codigoSupervisor.length < 4) {
      setError("Código de supervisor inválido");
      return;
    }

    if (selectedRole && selectedOrg) {
      login("OPR-MANUAL", data.nombre, selectedRole, selectedOrg, data.legajo);
      completeLogin();

      setShowOlvidoCarnet(false);

      if (selectedRole === "ADMINISTRADOR") {
        navigate("/reportes");
      } else {
        navigate("/setup");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 md:p-8">
      <div className="max-w-3xl w-full space-y-8 md:space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 md:space-y-4">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide px-4">
            CONTROL DE CALIDAD EN RECEPCIÓN
          </h1>
          <p className="text-gray-400 text-lg md:text-xl lg:text-2xl px-4">
            Seleccione su tipo de acceso e ingrese PIN
          </p>
        </div>

        {/* 1. TIPO DE ACCESO */}
        <div className="space-y-3 px-4">
          <p className="text-gray-300 font-['Space_Grotesk'] font-bold text-sm uppercase">
            1. Tipo de Acceso
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleRoleSelect("ADMINISTRADOR")}
              className={`p-6 rounded-lg border-2 transition-all min-h-[120px] flex flex-col items-center justify-center gap-3 ${
                selectedRole === "ADMINISTRADOR"
                  ? "bg-[#8b5cf6]/20 border-[#8b5cf6] shadow-[0px_0px_20px_0px_rgba(139,92,246,0.4)]"
                  : "bg-[#1a1a1a] border-gray-700 hover:border-gray-600"
              }`}
            >
              <Shield size={32} className={selectedRole === "ADMINISTRADOR" ? "text-[#8b5cf6]" : "text-gray-400"} />
              <span className={`font-['Space_Grotesk'] font-bold text-lg text-center ${
                selectedRole === "ADMINISTRADOR" ? "text-[#8b5cf6]" : "text-white"
              }`}>
                ADMINISTRADOR
              </span>
            </button>

            <button
              onClick={() => handleRoleSelect("ANALISTA_CALIDAD")}
              className={`p-6 rounded-lg border-2 transition-all min-h-[120px] flex flex-col items-center justify-center gap-3 ${
                selectedRole === "ANALISTA_CALIDAD"
                  ? "bg-[#3b82f6]/20 border-[#3b82f6] shadow-[0px_0px_20px_0px_rgba(59,130,246,0.4)]"
                  : "bg-[#1a1a1a] border-gray-700 hover:border-gray-600"
              }`}
            >
              <ClipboardCheck size={32} className={selectedRole === "ANALISTA_CALIDAD" ? "text-[#3b82f6]" : "text-gray-400"} />
              <span className={`font-['Space_Grotesk'] font-bold text-lg text-center leading-tight ${
                selectedRole === "ANALISTA_CALIDAD" ? "text-[#3b82f6]" : "text-white"
              }`}>
                ANALISTA DE CALIDAD
              </span>
            </button>

            <button
              onClick={() => handleRoleSelect("OPERARIO")}
              className={`p-6 rounded-lg border-2 transition-all min-h-[120px] flex flex-col items-center justify-center gap-3 ${
                selectedRole === "OPERARIO"
                  ? "bg-[#3b82f6]/20 border-[#3b82f6] shadow-[0px_0px_20px_0px_rgba(59,130,246,0.4)]"
                  : "bg-[#1a1a1a] border-gray-700 hover:border-gray-600"
              }`}
            >
              <User size={32} className={selectedRole === "OPERARIO" ? "text-[#3b82f6]" : "text-gray-400"} />
              <span className={`font-['Space_Grotesk'] font-bold text-lg text-center ${
                selectedRole === "OPERARIO" ? "text-[#3b82f6]" : "text-white"
              }`}>
                OPERARIO
              </span>
            </button>
          </div>
        </div>

        {/* 2. TIPO DE ORGANIZACIÓN */}
        {selectedRole && (
          <div className="space-y-3 px-4">
            <p className="text-gray-300 font-['Space_Grotesk'] font-bold text-sm uppercase">
              2. Tipo de Organización
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                disabled={selectedRole === "OPERARIO"}
                onClick={() => {
                  setSelectedOrg("ABASTECEDOR");
                  setError(null);
                }}
                className={`p-6 rounded-lg border-2 transition-all min-h-[120px] flex flex-col items-center justify-center gap-3 relative group ${
                  selectedRole === "OPERARIO" 
                    ? "bg-[#1a1a1a] border-gray-800 opacity-40 cursor-not-allowed"
                    : selectedOrg === "ABASTECEDOR"
                    ? "bg-[#f59e0b]/20 border-[#f59e0b] shadow-[0px_0px_20px_0px_rgba(245,158,11,0.4)]"
                    : "bg-[#1a1a1a] border-gray-700 hover:border-gray-600"
                }`}
              >
                <Package size={32} className={selectedOrg === "ABASTECEDOR" ? "text-[#f59e0b]" : "text-gray-400"} />
                <span className={`font-['Space_Grotesk'] font-bold text-lg ${
                  selectedOrg === "ABASTECEDOR" ? "text-[#f59e0b]" : "text-white"
                }`}>
                  ABASTECEDOR
                </span>
                {selectedRole === "OPERARIO" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity rounded-lg p-2 text-center pointer-events-none">
                    No disponible para este rol
                  </div>
                )}
              </button>

              <button
                disabled={selectedRole === "ANALISTA_CALIDAD"}
                onClick={() => {
                  setSelectedOrg("PRODUCTOR");
                  setError(null);
                }}
                className={`p-6 rounded-lg border-2 transition-all min-h-[120px] flex flex-col items-center justify-center gap-3 relative group ${
                  selectedRole === "ANALISTA_CALIDAD"
                    ? "bg-[#1a1a1a] border-gray-800 opacity-40 cursor-not-allowed"
                    : selectedOrg === "PRODUCTOR"
                    ? "bg-[#10b981]/20 border-[#10b981] shadow-[0px_0px_20px_0px_rgba(16,185,129,0.4)]"
                    : "bg-[#1a1a1a] border-gray-700 hover:border-gray-600"
                }`}
              >
                <Building2 size={32} className={selectedOrg === "PRODUCTOR" ? "text-[#10b981]" : "text-gray-400"} />
                <span className={`font-['Space_Grotesk'] font-bold text-lg ${
                  selectedOrg === "PRODUCTOR" ? "text-[#10b981]" : "text-white"
                }`}>
                  PRODUCTOR
                </span>
                {selectedRole === "ANALISTA_CALIDAD" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity rounded-lg p-2 text-center pointer-events-none">
                    No disponible para este rol
                  </div>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mx-4 bg-[#ef4444]/20 border-2 border-[#ef4444] rounded-lg p-4 text-center">
            <p className="text-[#ef4444] font-['Space_Grotesk'] font-bold text-sm">
              ⚠️ {error}
            </p>
          </div>
        )}

        {/* PIN Display */}
        <div className={`bg-[#1a1a1a] border-2 rounded-lg p-4 md:p-8 transition-all ${
          (selectedRole && selectedOrg) ? "border-gray-700" : "border-gray-800 opacity-50 pointer-events-none"
        }`}>
          <div className="flex justify-center gap-2 md:gap-4 mb-6 md:mb-8">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-12 h-12 md:w-16 md:h-16 border-2 border-gray-600 rounded-lg flex items-center justify-center bg-[#0a0a0a]"
              >
                {pin[i] && (
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-[#3b82f6] rounded-full" />
                )}
              </div>
            ))}
          </div>

          <NumPad value={pin} onChange={setPin} onSubmit={handleSubmit} />
        </div>

        {/* Alternative Login */}
        <div className="text-center">
          <button
            onClick={() => {
              if (!selectedRole) {
                setError("Debe seleccionar un rol antes de usar ingreso manual");
                return;
              }
              if (!selectedOrg) {
                setError("Debe seleccionar un tipo de organización antes de usar ingreso manual");
                return;
              }
              setShowOlvidoCarnet(true);
            }}
            className={`inline-flex items-center justify-center gap-3 px-6 md:px-8 py-4 md:py-5 font-bold rounded-lg transition-colors min-h-[64px] text-base md:text-lg w-full md:w-auto ${
              (selectedRole && selectedOrg)
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-gray-900 text-gray-500 cursor-not-allowed border border-gray-800"
            }`}
          >
            <CreditCard size={24} />
            ¿Olvidó su Carnet? Ingreso Manual
          </button>
        </div>

        {/* Footer Info */}
        <div className="text-center text-gray-600 text-xs md:text-sm px-4">
          <p>Sistema de Inspección Visual v2.1</p>
          <p className="mt-2">ISO 2859-1 | AQL 1.0%</p>
        </div>
      </div>

      {/* Olvido Carnet Modal */}
      {showOlvidoCarnet && (
        <OlvidoCarnetModal
          onClose={() => setShowOlvidoCarnet(false)}
          onConfirm={handleOlvidoCarnetConfirm}
        />
      )}
    </div>
  );
}