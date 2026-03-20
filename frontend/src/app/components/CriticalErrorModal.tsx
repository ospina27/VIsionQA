import { AlertTriangle, XCircle } from "lucide-react";
import { useState } from "react";

interface CriticalErrorModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export function CriticalErrorModal({ onClose, onConfirm }: CriticalErrorModalProps) {
  const [pin, setPin] = useState("");
  const [step, setStep] = useState<"alert" | "pin">("alert");

  const handleContinue = () => {
    setStep("pin");
  };

  const handleConfirm = () => {
    if (pin.length >= 4) {
      onConfirm();
    }
  };

  return (
    <div className="fixed inset-0 bg-red-900/50 backdrop-blur-sm flex items-center justify-center p-8 z-50">
      <div className="w-full h-full bg-[#ff3b3b] flex flex-col items-center justify-center">
        {step === "alert" ? (
          <div className="max-w-4xl text-center space-y-12">
            {/* Icon */}
            <div className="flex justify-center">
              <XCircle size={120} className="text-white" />
            </div>

            {/* Title */}
            <h1 className="text-white text-7xl font-bold">
              LOTE RECHAZADO
            </h1>
            
            <p className="text-white text-3xl font-bold">
              Límite de Calidad Superado
            </p>

            {/* Instructions */}
            <div className="bg-white/20 rounded-lg p-10 text-left">
              <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-4">
                <AlertTriangle size={32} />
                PROTOCOLO DE PARADA DE LÍNEA (SOP-QC-002)
              </h2>
              <ol className="space-y-4 text-white text-xl">
                <li className="flex gap-4">
                  <span className="font-bold min-w-[40px]">1.</span>
                  <span>Detenga la banda transportadora inmediatamente</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold min-w-[40px]">2.</span>
                  <span>Aísle el lote completo en la Zona de Cuarentena (Área Amarilla)</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold min-w-[40px]">3.</span>
                  <span>Coloque la etiqueta roja "NO CONFORME" en el contenedor</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold min-w-[40px]">4.</span>
                  <span>Notifique al Supervisor de Calidad vía radio (Canal 3)</span>
                </li>
              </ol>
            </div>

            {/* Action Button */}
            <button
              onClick={handleContinue}
              className="bg-white text-[#ff3b3b] font-bold text-2xl px-16 py-8 rounded-lg hover:bg-gray-100 transition-colors min-h-[100px]"
            >
              Continuar (Requiere PIN de Supervisor)
            </button>

            <button
              onClick={onClose}
              className="text-white underline text-xl hover:text-gray-200 transition-colors"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <div className="max-w-2xl w-full space-y-10">
            <div className="text-center">
              <h2 className="text-white text-4xl font-bold mb-4">
                Autorización Requerida
              </h2>
              <p className="text-white text-xl">
                Ingrese el PIN del supervisor para generar reporte y finalizar
              </p>
            </div>

            <div className="bg-white rounded-lg p-8">
              <div className="flex justify-center gap-4 mb-8">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-16 h-16 border-4 border-gray-300 rounded-lg flex items-center justify-center bg-gray-50"
                  >
                    {pin[i] && (
                      <div className="w-4 h-4 bg-[#ff3b3b] rounded-full" />
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "←"].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => {
                      if (btn === "C") setPin("");
                      else if (btn === "←") setPin(pin.slice(0, -1));
                      else if (pin.length < 6) setPin(pin + btn);
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-black font-bold rounded-lg min-h-[80px] text-2xl transition-colors"
                  >
                    {btn}
                  </button>
                ))}
              </div>

              <button
                onClick={handleConfirm}
                disabled={pin.length < 4}
                className="w-full mt-6 bg-[#ff3b3b] hover:bg-[#ff1f1f] text-white font-bold rounded-lg py-6 text-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[80px]"
              >
                Generar Reporte y Finalizar
              </button>
            </div>

            <button
              onClick={() => setStep("alert")}
              className="w-full text-white underline text-lg hover:text-gray-200 transition-colors"
            >
              Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
