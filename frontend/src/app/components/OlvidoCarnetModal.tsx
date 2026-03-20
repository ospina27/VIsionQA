import { useState } from "react";
import { X, AlertTriangle, User, Hash, Lock, CheckCircle } from "lucide-react";

interface OlvidoCarnetModalProps {
  onClose: () => void;
  onConfirm: (data: { nombre: string; legajo: string; codigoSupervisor: string }) => void;
}

export function OlvidoCarnetModal({ onClose, onConfirm }: OlvidoCarnetModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [nombre, setNombre] = useState("");
  const [legajo, setLegajo] = useState("");
  const [codigoSupervisor, setCodigoSupervisor] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!nombre.trim() || !legajo.trim()) {
      setError("Complete todos los campos requeridos");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleConfirm = () => {
    if (!codigoSupervisor.trim()) {
      setError("Ingrese el código de supervisor");
      return;
    }
    // Validación simple del código (en producción sería contra base de datos)
    if (codigoSupervisor !== "SUP2024") {
      setError("Código de supervisor inválido");
      return;
    }
    setError("");
    onConfirm({ nombre, legajo, codigoSupervisor });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[#18181b] border-2 border-[#ffb4ab] w-[480px] max-h-[90vh] overflow-y-auto shadow-[0px_0px_60px_0px_rgba(255,180,171,0.3)]">
        {/* Header */}
        <div className="bg-[#2a2a2a] border-b-2 border-[#ffb4ab] p-6 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#ffb4ab]/10 rounded">
              <AlertTriangle size={28} className="text-[#ffb4ab]" />
            </div>
            <div>
              <h2 className="text-white font-['Space_Grotesk'] font-bold text-xl mb-1">
                ACCESO SIN CARNET
              </h2>
              <p className="text-[#a1a1aa] font-['Inter'] text-sm">
                Registro manual de operario - Requiere autorización
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#3f3f46] rounded transition-colors"
          >
            <X size={20} className="text-[#71717a]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className={`flex items-center gap-2 ${step === 1 ? 'text-[#f1c100]' : 'text-green-500'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                step === 1 ? 'border-[#f1c100] bg-[#f1c100]/10' : 'border-green-500 bg-green-500/10'
              }`}>
                {step === 2 ? '✓' : '1'}
              </div>
              <span className="font-['Space_Grotesk'] text-sm font-bold">DATOS OPERARIO</span>
            </div>
            <div className="w-12 h-0.5 bg-[#3f3f46]" />
            <div className={`flex items-center gap-2 ${step === 2 ? 'text-[#f1c100]' : 'text-[#3f3f46]'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm ${
                step === 2 ? 'border-[#f1c100] bg-[#f1c100]/10' : 'border-[#3f3f46]'
              }`}>
                2
              </div>
              <span className="font-['Space_Grotesk'] text-sm font-bold">AUTORIZACIÓN</span>
            </div>
          </div>

          {/* Step 1: Operator Data */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="bg-[#2a2a2a] border border-[#3f3f46] p-4 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={16} className="text-[#f1c100]" />
                  <span className="text-[#f1c100] font-['Space_Grotesk'] text-xs font-bold">IMPORTANTE</span>
                </div>
                <p className="text-[#a1a1aa] font-['Inter'] text-sm leading-relaxed">
                  Este acceso quedará registrado y requiere código de supervisor. 
                  Use solo en caso de olvido de carnet o falla del lector RFID.
                </p>
              </div>

              {/* Nombre Completo */}
              <div>
                <label className="flex items-center gap-2 text-[#d4d4d8] font-['Space_Grotesk'] font-bold text-sm mb-2">
                  <User size={16} />
                  NOMBRE COMPLETO DEL OPERARIO *
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value.toUpperCase())}
                  placeholder="Ej: FERNANDO RODRIGUEZ"
                  className="w-full bg-[#0a0a0a] border border-[#3f3f46] text-white font-['Inter'] text-base px-4 py-4 rounded focus:border-[#f1c100] focus:outline-none transition-colors"
                  autoFocus
                />
              </div>

              {/* Legajo */}
              <div>
                <label className="flex items-center gap-2 text-[#d4d4d8] font-['Space_Grotesk'] font-bold text-sm mb-2">
                  <Hash size={16} />
                  LEGAJO O ID DE EMPLEADO *
                </label>
                <input
                  type="text"
                  value={legajo}
                  onChange={(e) => setLegajo(e.target.value.toUpperCase())}
                  placeholder="Ej: EMP-4492"
                  className="w-full bg-[#0a0a0a] border border-[#3f3f46] text-white font-['Inter'] text-base px-4 py-4 rounded focus:border-[#f1c100] focus:outline-none transition-colors"
                />
              </div>

              {error && (
                <div className="bg-[#dc2626]/10 border border-[#dc2626] p-3 rounded">
                  <p className="text-[#ffb4ab] font-['Inter'] text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleContinue}
                className="w-full bg-[#f1c100] hover:bg-[#d4a900] text-black font-['Space_Grotesk'] font-bold text-base py-4 rounded transition-colors uppercase"
              >
                Continuar →
              </button>
            </div>
          )}

          {/* Step 2: Supervisor Authorization */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="bg-[#2a2a2a] border-l-4 border-[#f1c100] p-4">
                <div className="text-[#71717a] font-['Space_Grotesk'] text-xs uppercase mb-2">
                  DATOS INGRESADOS
                </div>
                <div className="space-y-1">
                  <div className="text-white font-['Inter'] text-base">{nombre}</div>
                  <div className="text-[#a1a1aa] font-['Liberation_Mono'] text-sm">LEGAJO: {legajo}</div>
                </div>
              </div>

              <div className="bg-[#dc2626]/10 border border-[#dc2626] p-4 rounded">
                <div className="flex items-start gap-3">
                  <Lock size={20} className="text-[#ffb4ab] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[#ffb4ab] font-['Space_Grotesk'] font-bold text-sm mb-1">
                      AUTORIZACIÓN REQUERIDA
                    </div>
                    <p className="text-[#a1a1aa] font-['Inter'] text-sm">
                      Solicite al supervisor de turno que ingrese su código de autorización.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-[#d4d4d8] font-['Space_Grotesk'] font-bold text-sm mb-2">
                  <Lock size={16} />
                  CÓDIGO DE SUPERVISOR *
                </label>
                <input
                  type="password"
                  value={codigoSupervisor}
                  onChange={(e) => setCodigoSupervisor(e.target.value.toUpperCase())}
                  placeholder="Ingrese código de 6-8 caracteres"
                  className="w-full bg-[#0a0a0a] border border-[#3f3f46] text-white font-['Liberation_Mono'] text-lg px-4 py-4 rounded focus:border-[#f1c100] focus:outline-none transition-colors tracking-widest"
                  autoFocus
                />
                <div className="text-[#71717a] font-['Inter'] text-xs mt-2">
                  💡 Código predeterminado para demo: SUP2024
                </div>
              </div>

              {error && (
                <div className="bg-[#dc2626]/10 border border-[#dc2626] p-3 rounded">
                  <p className="text-[#ffb4ab] font-['Inter'] text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setStep(1);
                    setError("");
                  }}
                  className="flex-1 bg-[#353534] hover:bg-[#3f3f46] text-[#a1a1aa] font-['Space_Grotesk'] font-bold text-sm py-4 rounded transition-colors uppercase"
                >
                  ← Volver
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 bg-[#10b981] hover:bg-[#059669] text-white font-['Space_Grotesk'] font-bold text-sm py-4 rounded transition-colors uppercase flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} />
                  Autorizar Acceso
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
