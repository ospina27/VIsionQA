import { useState } from "react";
import { useNavigate } from "react-router";
import { NumPad } from "../components/NumPad";
import { CreditCard } from "lucide-react";
import { OlvidoCarnetModal } from "../components/OlvidoCarnetModal";

export function LoginOperativo() {
  const [pin, setPin] = useState("");
  const [showOlvidoCarnet, setShowOlvidoCarnet] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (pin.length >= 4) {
      // Simulate login
      navigate("/setup");
    }
  };

  const handleOlvidoCarnetConfirm = (data: { nombre: string; legajo: string; codigoSupervisor: string }) => {
    console.log("Acceso autorizado sin carnet:", data);
    // Registro manual exitoso, redirigir a setup
    setShowOlvidoCarnet(false);
    navigate("/setup");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 md:p-8">
      <div className="max-w-2xl w-full space-y-8 md:space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 md:space-y-4">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide px-4">
            CONTROL DE CALIDAD EN RECEPCIÓN
          </h1>
          <p className="text-gray-400 text-lg md:text-xl lg:text-2xl px-4">
            Ingrese su PIN de operario para iniciar turno
          </p>
        </div>

        {/* PIN Display */}
        <div className="bg-[#1a1a1a] border-2 border-gray-700 rounded-lg p-4 md:p-8">
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
            onClick={() => setShowOlvidoCarnet(true)}
            className="inline-flex items-center gap-3 px-6 md:px-8 py-4 md:py-5 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors min-h-[64px] text-base md:text-lg"
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